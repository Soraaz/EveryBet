# -*- coding: utf-8 -*-

import json
import pymysql
import sys
from datetime import datetime

def connect():
    """ Connect to the MySQL database server """
    conn = None
    try:
        params = {}

        with open('config.json') as f:
            config = json.load(f)
        params['host'] = config['database']['host']
        params['port'] = config['database']['port']
        params['user'] = config['database']['user']
        params['passwd'] = config['database']['password']
        params['db'] = config['database']['database']
 
        conn = pymysql.connect(host=params['host'], port=int(params['port']), user=params['user'], passwd=params['passwd'], db=params['db'])
        cur = conn.cursor()

        cur.execute('SELECT version()')
        cur.close()
    except pymysql.Error as e:
        print("Error %d: %s" % (e.args[0], e.args[1]))
        exit(1)
    except NameError as error:
        print(error)
        exit(1)
    finally:
      return conn

def disconnect(conn):
    """ Disconnect from the MySQL database server """
    conn.close()

def dailyReward(conn):
    """ Change the state of eligibility for the daily reward """
    with conn.cursor() as cursor:
        sql = 'SELECT * FROM `users`'
        cursor.execute(sql)
        for user in cursor.fetchall():
            if user[7] == 1:
                rewardTier = user[8] % 7 + 1
                print('Setting reward tier {} for user n°{} ({})'.format(rewardTier, user[0], user[4]))
                _sql = 'UPDATE `users` SET `rewardTier` = {}, `reward` = 0 WHERE `id` = {}'.format(rewardTier, user[0])
            elif user[7] == 0:
                print('Resetting reward tier for user n°{} ({})'.format(user[0], user[4]))
                _sql = 'UPDATE `users` SET `rewardTier` = 1 WHERE `id` = {}'.format(user[0])
            with conn.cursor() as _cursor:
                _cursor.execute(_sql, ())
        conn.commit()

def coinsRedistribution(conn):
    """ Redistribute coins to the winners of a completed bet """
    with conn.cursor() as cursor:
        sql = 'SELECT * FROM `bets` WHERE `finished` = true AND `coinsRedistributed` = false AND `correctAnswerId` IS NOT NULL'
        cursor.execute(sql)
        for bet in cursor.fetchall():
            print('Redistributing coins of bet n°{} ({})'.format(bet[0], bet[1]))

            with conn.cursor() as _cursor:
                _sql = 'SELECT SUM(`coins`) FROM `users_answers` WHERE `betId` = %s AND `answerId` = %s'
                _cursor.execute(_sql, (bet[0], bet[6]))
                for coins in _cursor.fetchall():
                    winnersCoins = coins[0]

                _sql = 'SELECT SUM(`coins`) FROM `users_answers` WHERE `betId` = %s'
                _cursor.execute(_sql, (bet[0]))
                for coins in _cursor.fetchall():
                    totalCoins = coins[0]

                _sql = 'SELECT * FROM `users_answers` WHERE `betId` = %s AND `answerId` = %s'
                _cursor.execute(_sql, (bet[0], bet[6]))
                for answer in _cursor.fetchall():
                    wonCoins = round(totalCoins * (answer[3] / winnersCoins))
                    print('Giving {} coins to user n°{} for betting {} coins'.format(wonCoins, answer[0], answer[3]))

                    _sql = 'SELECT * FROM `users` WHERE `id` = %s'
                    _cursor.execute(_sql, (answer[0]))
                    for user in _cursor.fetchall():
                        _sql = 'UPDATE `users` SET `coins` = %s WHERE id = %s'
                        _cursor.execute(_sql, (user[5] + wonCoins, answer[0]))
            
            with conn.cursor() as _cursor:
                _sql = 'UPDATE `bets` SET `coinsRedistributed` = true WHERE `id` = %s'
                _cursor.execute(_sql, (bet[0]))
        conn.commit()

def checkDeadline(conn):
    """ Check bets deadline and updates it accordingly """
    timestamp = int(datetime.timestamp(datetime.now()))
    
    with conn.cursor() as cursor:
        sql = 'SELECT * FROM `bets` WHERE `deadline` <= %s AND `finished` = false'
        cursor.execute(sql, (timestamp))
        for bet in cursor.fetchall():
            print('Closing bet n°{} ({})'.format(bet[0], bet[1]))
            with conn.cursor() as _cursor:
                _sql = 'UPDATE `bets` SET `finished` = true WHERE `id` = %s'
                _cursor.execute(_sql, (bet[0]))
        conn.commit()

if __name__ == '__main__':
    conn = connect()
    if conn is not None:
        checkDeadline(conn)
        coinsRedistribution(conn)
        dailyReward(conn)
        disconnect(conn)
    else:
        exit(1)