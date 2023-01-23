// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    projectId: 'quizproject-4b7f0',
    appId: '1:523997186300:web:72ac89fab238ff020c2f79',
    storageBucket: 'quizproject-4b7f0.appspot.com',
    apiKey: 'AIzaSyCicyrZCsKZthx-ip1kd35HoeZtDh1oLvI',
    authDomain: 'quizproject-4b7f0.firebaseapp.com',
    messagingSenderId: '523997186300',
    measurementId: 'G-C5Z1CW1KNW',
    databaseURL: "https://quizproject-4b7f0-default-rtdb.europe-west1.firebasedatabase.app/"
  }

};

/*
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
