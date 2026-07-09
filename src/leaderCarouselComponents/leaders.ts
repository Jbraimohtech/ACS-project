// leaders.ts

import leaderOne from "../assets/images/Alhaji-image.jpg";
import leaderTwo from "../assets/images/Alhaji-image.jpg";
import leaderThree from "../assets/images/Alhaji-image.jpg";
import leaderFour from "../assets/images/Alhaji-image.jpg";
import leaderFive from "../assets/images/Alhaji-image.jpg";
import leaderSix from "../assets/images/Alhaji-image.jpg";
import leaderSeven from "../assets/images/Alhaji-image.jpg";
import leaderEight from "../assets/images/Alhaji-image.jpg";
import leaderNine from "../assets/images/Alhaji-image.jpg";
import leaderTen from "../assets/images/Alhaji-image.jpg";

/*
|--------------------------------------------------------------------------
| Leader Interface
|--------------------------------------------------------------------------
*/

export interface LeaderProfile {

    id: number;

    name: string;

    title: string;

    image: string;

    state?: string;

}

/*
|--------------------------------------------------------------------------
| Leader Data
|--------------------------------------------------------------------------
|
| Replace the imported images with the actual leader photographs.
|
*/

export const leaders: LeaderProfile[] = [

    {
        id: 1,
        name: "Chap. Gen. Julianah Enebeli Ebube",
        title: "Commandant General",
        image: leaderOne
    },

    {
        id: 2,
        name: "Chap. Jonathan Osarumwese",
        title: "Deputy Commandant General",
        image: leaderTwo
    },

    {
        id: 3,
        name: "Chap. Adekunle Paul",
        title: "National Secretary",
        image: leaderThree
    },

    {
        id: 4,
        name: "Chaplain Stephen Oghogho",
        title: "Director of Logistics & Training",
        image: leaderFour
    },

    {
        id: 5,
        name: "Chap. Dr. S. A. Tamisere",
        title: "National Treasurer",
        image: leaderFive
    },

    {
        id: 6,
        name: "Chap. Barr. Gimbright Adaigho",
        title: "Legal Adviser",
        image: leaderSix
    },

    {
        id: 7,
        name: "Chap. John Ighome",
        title: "Edo State Commandant",
        state: "Edo",
        image: leaderSeven
    },

    {
        id: 8,
        name: "Chap. Rufus Etimnwoba",
        title: "Oyo State Commandant",
        state: "Oyo",
        image: leaderEight
    },

    {
        id: 9,
        name: "Chap. Peter O.",
        title: "Enugu State Commandant",
        state: "Enugu",
        image: leaderNine
    },

    {
        id: 10,
        name: "Chap. Emmanuel Okechukwu",
        title: "Anambra State Commandant",
        state: "Anambra",
        image: leaderTen
    }

];

/*
|--------------------------------------------------------------------------
| Infinite Carousel Data
|--------------------------------------------------------------------------
|
| Duplicating the array creates a perfectly seamless infinite animation.
|
*/

export const carouselLeaders = [

    ...leaders,

    ...leaders

];