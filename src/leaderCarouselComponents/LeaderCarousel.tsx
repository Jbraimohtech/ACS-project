import "./LeaderCarousel.css";

import { carouselLeaders } from "./leaders";

const LeaderCarousel = () => {
    const marqueeLeaders = [...carouselLeaders, ...carouselLeaders];

    return (

        <section className="rocketCarouselUniverse">

            <div className="waffleHeadingBox">

                <span className="bananaRibbon">
                    NATIONAL LEADERSHIP
                </span>

                <div className="waffleHeadingText-header">

                    <h2>
                        Meet Our National Leaders
                    </h2>

                </div>

                <p>
                    Dedicated men and women committed to providing spiritual
                    leadership, humanitarian service, and organizational
                    excellence across Ambassadors Chaplain Corps.
                </p>

            </div>

            <div className="pickleCarouselWrapper">

                <div className="cheeseMeteorTrack">

                    {marqueeLeaders.map((leader, index) => (

                        <div
                            className="penguinLeaderCard"
                            key={`${leader.id}-${index}`}
                        >

                            <div className="strawberryPhotoWrapper">

                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    className="blueberryLeaderImage"
                                />

                            </div>

                            <div className="kiwiContentBox">

                                <h3>
                                    {leader.name}
                                </h3>

                                <span className="orangeLeaderTitle">
                                    {leader.title}
                                </span>

                                {leader.state && (

                                    <span className="mangoStateBadge">
                                        {leader.state}
                                    </span>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            <div className="pickleCarouselButtonWrapper">
                <button className="rocketCarouselButton" onClick={() => window.location.href = "/leaders"}>
                    View All Leaders
                </button>
            </div>

        </section>

    );
};

export default LeaderCarousel;