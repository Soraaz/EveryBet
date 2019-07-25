import RatingRequestor from 'react-native-rating-requestor';
import {AsyncStorage} from "react-native";

export default class RatingPage {
    static options = {
        title: "Notez l'application !",
        message: "Si vous aimez (ou pas) l'application, aider nous en donnant votre avis sur everybet !",
        actionLabels: {
            decline: "Ca ne m'interesse pas.",
            delay: "Plus tard",
            accept: "J'accepte !",
        },
        shouldBoldLastButton: true,
        storeAppName: "Everybet",
        storeCountry: "fr",
    };

    static async launch()
    {
        const rate = await AsyncStorage.getItem("rate");
        if (rate !== "false")
            RatingPage.sendModal();
    }

    static async deniedRating()
    {
        await AsyncStorage.multiSet([['rate', 'false']]);
    }

    static async sendModal() {
        let RatingTracker = new RatingRequestor('com.everybet.everybet', this.options);
        RatingTracker.showRatingDialog((didAppear, userDecision) => {
            if (didAppear) {
                switch(userDecision)
                {
                    case 'decline': this.deniedRating(); break;
                }
            }
        });
    }
}