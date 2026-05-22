import AllMainContent from "../components/AllMainContent";
import HomeFooter from "../components/HomeFooter";
import MobileScreenNav from "../components/Navbar/MobileScreenNav";
import "./Blog.css";

function BlogDetails() {
  return (
    <div>
        <AllMainContent> 
        <MobileScreenNav />
        <div className='event-head-text-box'>
          <div className='blog-d-small-event-box'>
            <p>Blogs details</p>
          </div>
        </div>
        <div className='event-head-text'>
            <h1>
                The Power of Order
            <br />
            in a Kingdom System
            </h1> 
        </div>

        {/* This is for only media query and it is not expected to be on big screens */}
          <div  className='event-head-text-phone'>
            <h1>
              Andrea Luises
            </h1>
          </div>
        {/* The end of it from media query*/}
      </AllMainContent>

      {/* BLOG CONTENT */}
      <section className="blog-details-content">
        <div className="intro">
          <div className="shade-circle-box">
            <div className="shade-circle"></div>
            <p>
              In every system that thrives, there is one constant: order. <br />
              Not just activity. Not just intention. But structure — intentional, defined, and sustained.
            </p>
          </div>
          
          <div className="shade-circle-box">
            <div className="shade-circle"></div>
            <p>
              Many communities fail not because they lack passion, but because they lack alignment. Effort exists, but direction is scattered. <br />
              People are willing, but systems are weak.
            </p>
          </div>

          <div className="shade-circle-box">
            <div className="shade-circle"></div>
            <p>
              This is why order is not optional. It is foundational.
            </p>
          </div>
        </div>

        <div className="blog-details-img-one"></div>

        <div className="blog-layout">
          {/* LEFT */}
          <div className="blog-layout-left">

            <h2>Order Is the <br /> Foundation of Growth</h2>

            <p>
              Growth without structure leads to confusion.
            </p>

            <p>
              When roles are unclear, responsibilities overlap. When communication is scattered, people disconnect. When systems are weak, even strong individuals become ineffective.
            </p>

            <p>
              Order creates clarity. And clarity creates momentum.
            </p>

            <h2>Every <br /> Member Has a Place</h2>

            <span className="blog-layout-left-pp">
              A system is only as strong as its ability to recognize and position its members correctly.
            </span>
            <span className="blog-layout-left-pp">In a well-structured body:</span>
            <ul className="text-list">
              <li>Everyone is Known</li>
              <li>Everyone is accounted for</li>
              <li>Everyone understands their role</li>
            </ul>
            <span className="blog-layout-left-pp">
              This is not control — it is alignment. <br />
              And alignment produces strength.
            </span>  
            
            <div className="scripture-box">
              <h3>Scriptures</h3>
              <p>
                "Let all things be done decently and in order."
              </p>
              <span>1 Corinthians 14:40</span>
            </div>

            <p>
              This incentive does two things: it lowers the barrier to entry for entrepreneurs and immediately tackles local unemployment rates. It's a win-win solution that has been proven to work
            </p>

          </div>

          {/* RIGHT */}
          <div className="blog-layout-right">
            <div className="post-card">
              <h3>Popular Post</h3>

              <div className="blog-img-right-layout-box">
                <div className="blog-img-right-layout"></div>
              </div>
              <div className="blog-details-date">
                  <p className="date">
                    29 Jun 2022,
                  </p>
                  <span>by John Wright</span>
              </div>
              
              <h4>
                From Traditional Banking
                to Digital Disruption.
              </h4>

              <p className="post-card-paragraph">
                Participate in a city-wide cleanup,
                followed by a community barbecue.
              </p>
              <div className="flex-blog-announce">
                <div className="flex-blog-announce-events">Announcements</div>
                <div className="flex-blog-announce-events">Event Reports</div>
              </div>
              <div className="blog-explore-topics">
                <h3>Explore Topics</h3>
                <div className="flex-blog-announce">                                        
                  <div className="blog-explore-topics-trainings">Doctrines</div>
                  <div className="blog-explore-topics-trainings">Trainings</div>
                </div>
                <div className="flex-blog-announce">
                  <div className="blog-explore-topics-trainings">Trainings</div>
                  <div className="blog-explore-topics-trainings">Trainings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HomeFooter />

    </div>
  );
}

export default BlogDetails;