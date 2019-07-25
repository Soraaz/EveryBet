# -*- coding: utf-8 -*-

import pymysql
import sys
import warnings
from pathlib import Path

def connect():
    """ Connect to the MySQL database server """
    conn = None
    try:
        if len(sys.argv) != 6:
            raise NameError('Usage: python updateDatabase.py [host][port][user][passwd][db]')

        params = {}

        params['host'] = sys.argv[1]
        params['port'] = sys.argv[2]
        params['user'] = sys.argv[3]
        params['passwd'] = sys.argv[4]
        params['db'] = sys.argv[5]
 
        print('Connecting to the MySQL database...')

        conn = pymysql.connect(host=params['host'], port=int(params['port']), user=params['user'], passwd=params['passwd'], db=params['db'])
        cur = conn.cursor()

        cur.execute('SELECT version()')
        print('MySQL database version: {}'.format(cur.fetchone()[0]))   
        
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
    print('Database connection closed.')

def execScripts(conn):
  """ Execute all database-updater scripts located in ./sql/*.sql """
  pathlist = sorted(Path('./sql/').glob('**/*.sql'))
  cursor = conn.cursor()
  for path in pathlist:
        spath = str(path)
        print('Executing ' + spath + '...')
        with warnings.catch_warnings():
            warnings.simplefilter('ignore')
            rows_count = cursor.execute(open(spath, "r").read())
  cursor.close()
  conn.commit()

if __name__ == '__main__':
    conn = connect()
    if conn is not None:
        execScripts(conn)
        disconnect(conn)
    else:
        exit(1)
