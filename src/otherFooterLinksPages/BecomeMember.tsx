import Navbar from "../components/Navbar/Navbar";
import HomeFooter from "../components/HomeFooter";
import "./BecomeMember.css";
import { useNavigate } from "react-router-dom";

import {
    CheckCircle,
    GraduationCap,
    HeartHandshake,
    Users,
    Shield,
    Briefcase,
    BookOpen,
    ArrowRight,
    UserPlus,
    ClipboardCheck,
    School,
    BadgeCheck,
    Handshake,
    HelpCircle
} from "lucide-react";

const eligibility = [
    {
        icon: <BookOpen size={38} />,
        title: "Pastors & Ministers"
    },
    {
        icon: <Users size={38} />,
        title: "Church Workers & Ministry Leaders"
    },
    {
        icon: <Briefcase size={38} />,
        title: "Christian Professionals"
    },
    {
        icon: <HeartHandshake size={38} />,
        title: "Mature Christians Passionate About Service"
    },
    {
        icon: <Shield size={38} />,
        title: "Humanitarian Volunteers"
    },
    {
        icon: <GraduationCap size={38} />,
        title: "Individuals Ready For Chaplaincy Training"
    }
];

const benefits = [
    {
        icon: <GraduationCap size={34} />,
        title: "Professional Chaplaincy Training",
        text: "Receive structured training in counseling, emergency response, ethics, leadership and humanitarian service."
    },
    {
        icon: <HeartHandshake size={34} />,
        title: "Spiritual Growth",
        text: "Grow deeper in your faith while learning how to minister effectively in every environment."
    },
    {
        icon: <Users size={34} />,
        title: "Leadership Development",
        text: "Develop practical leadership skills that prepare you for impactful service."
    },
    {
        icon: <Shield size={34} />,
        title: "Humanitarian Service",
        text: "Participate in medical missions, prison ministry, disaster response and community outreach."
    },
    {
        icon: <Handshake size={34} />,
        title: "Fellowship & Networking",
        text: "Build relationships with ministers, professionals and believers who share your vision."
    },
    {
        icon: <BadgeCheck size={34} />,
        title: "Structured Growth",
        text: "Progress through an organized ranking and development system."
    }
];

const expectations = [
    "Live a life of integrity and Christian character.",
    "Uphold the Constitution, values and regulations of ACC.",
    "Demonstrate discipline, accountability and respect.",
    "Participate actively in trainings and Corps activities.",
    "Serve communities with compassion and excellence.",
    "Become an ambassador of peace, unity and hope."
];

const journey = [
    {
        icon: <UserPlus />,
        title: "Submit Application"
    },
    {
        icon: <ClipboardCheck />,
        title: "Application Review"
    },
    {
        icon: <Users />,
        title: "Orientation"
    },
    {
        icon: <School />,
        title: "Training"
    },
    {
        icon: <BadgeCheck />,
        title: "Induction"
    }
];

const faqs = [
    {
        question: "Do I have to be a pastor to join?",
        answer:
            "No. Membership is open to mature Christians who are passionate about serving God and humanity."
    },
    {
        question: "Will I receive training?",
        answer:
            "Yes. Every member receives structured chaplaincy and leadership training."
    },
    {
        question: "Are there opportunities to serve?",
        answer:
            "Absolutely. Members participate in humanitarian missions, prison ministry, hospital visits, outreach programmes and community development."
    },
    {
        question: "Is ACC a military organization?",
        answer:
            "No. ACC is a faith-based chaplaincy organization with a para-military structure that promotes discipline and order."
    }
];

const BecomeMember = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="becomeMemberPage">
                {/* HERO */}
                <section className="bananaWizardHero">
                    <Navbar />
                    <div className="bananaWizardHeroContent">

                        <span className="bananaWizardTag">
                            Become a Member
                        </span>

                        <h1>
                            Answer the Call.
                            <br />
                            Become an Ambassador of Hope.
                        </h1>

                        <p>

                            Every great movement begins with people willing to
                            serve.

                            At Ambassadors Chaplain Corps (ACC), membership is
                            more than joining an organization—it is becoming
                            part of a community committed to serving God,
                            strengthening communities and bringing hope where
                            it is needed most.

                        </p>

                        <div className="bananaWizardButtons">

                            <button onClick={() => navigate("/register")}>
                                Apply for Membership
                            </button>

                            <button className="ghostButton" onClick={() => navigate("/about-us")}>
                                Learn More
                            </button>

                        </div>

                    </div>

                </section>

            </div>

            {/* MAIN CONTENT */}

            <main className="pickleRocketPage">

                {/* INTRO */}

                <section className="pickleRocketIntro">

                    <h2>
                        Become a Member
                    </h2>

                    <p>

                        Whether you are a minister, church worker, Christian
                        leader or a mature believer with a heart for service,
                        ACC equips you with the training, structure and
                        opportunities to create lasting impact.

                    </p>

                </section>

                {/* WHO CAN JOIN */}

                <section className="waffleCastle">

                    <div className="sectionHeading">

                        <h2>
                            Who Can Join?
                        </h2>

                        <p>
                            Membership is open to individuals who share our
                            vision and desire to serve with discipline,
                            excellence and integrity.
                        </p>

                    </div>

                    <div className="marshmallowGalaxyGrid">

                        {eligibility.map((item, index) => (

                            <div
                                key={index}
                                className="cheeseMeteorCard"
                            >

                                <div className="cardIcon">

                                    {item.icon}

                                </div>

                                <h3>
                                    {item.title}
                                </h3>

                            </div>

                        ))}

                    </div>

                </section>

                {/* WHY JOIN */}

                <section className="waffleCastle">

                    <div className="sectionHeading">

                        <h2>
                            Why Become a Member?
                        </h2>

                    </div>

                    <div className="marshmallowGalaxyGrid">

                        {benefits.map((item, index) => (

                            <div
                                key={index}
                                className="cheeseMeteorCard"
                            >

                                <div className="cardIcon">

                                    {item.icon}

                                </div>

                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    {item.text}
                                </p>

                            </div>

                        ))}

                    </div>

                </section>

                {/* WHAT WE EXPECT */}

                <section className="penguinFlex">

                    <div className="penguinLeft">

                        <h2>
                            What We Expect From Our Members
                        </h2>

                        <div className="expectationList">

                            {expectations.map((item, index) => (

                                <div
                                    key={index}
                                    className="expectationItem"
                                >

                                    <CheckCircle
                                        size={20}
                                    />

                                    <span>

                                        {item}

                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                    <div className="penguinRight">

                        <h2>

                            Your Journey to Membership

                        </h2>

                        <div className="journeyTimeline">

                            {journey.map((item, index) => (

                                <div
                                    key={index}
                                    className="journeyCard"
                                >

                                    <div className="journeyIcon">

                                        {item.icon}

                                    </div>

                                    <h3>

                                        Step {index + 1}

                                    </h3>

                                    <p>

                                        {item.title}

                                    </p>

                                    {
                                        index !== journey.length - 1 &&

                                        <ArrowRight
                                            className="journeyArrow"
                                        />

                                    }

                                </div>

                            ))}

                        </div>

                    </div>

                </section>

                {/* FAQ */}

                <section className="faqRocket">

                    <div className="sectionHeading">

                        <h2>

                            <HelpCircle />

                            Frequently Asked Questions

                        </h2>

                    </div>

                    <div className="faqContainer">

                        {faqs.map((item, index) => (

                            <div
                                key={index}
                                className="faqCard"
                            >

                                <h3>

                                    {item.question}

                                </h3>

                                <p>

                                    {item.answer}

                                </p>

                            </div>

                        ))}

                    </div>

                </section>

                {/* CTA */}

                <section className="galaxyCallToAction">

                    <div>

                        <h2>

                            Ready to Make a Difference?

                        </h2>

                        <p>

                            Join Ambassadors Chaplain Corps today and become
                            part of a mission that transforms lives through
                            faith, service and leadership.

                        </p>

                    </div>

                    <button onClick={() => navigate("/register")}>

                        Apply for Membership

                    </button>

                </section>

            </main>

            <HomeFooter />

        </>

    );

};

export default BecomeMember;