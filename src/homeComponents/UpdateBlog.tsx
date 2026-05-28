import { useNavigate } from 'react-router-dom';
import YellowBtn from '../components/BlueBtn'

const UpdateBlog = () => {
    const navigate = useNavigate();

    const goToViewBlog = () => {
        navigate("/blog")
    }


  return (
    <div>
        <div className='blog-box'>
            <div className='blog-content-numbering'>
                <div className='number-blog-box'>
                    <div className='number-reason-item'>
                        <p>07</p>
                    </div>
                    <h3 className='number-blog-text'>
                        Blog
                    </h3>
                </div>
            </div>
            <div className='blog-content-title'>
                <h2>
                    Stay Updated with
                    Campaign News
                </h2>
                <YellowBtn>
                    <button className='view-all-btn-expand' onClick={goToViewBlog}>View All Blogs</button>
                </YellowBtn>
            </div>

            <div className='blog-content-outline'>
                <div className='blog-content-outline-one'>
                    <div className='blog-img-one'></div>
                    <div className='blog-img-one-letter'>
                        <h4>
                            Tax-Saving Strategies for <br />
                            Small Business
                        </h4>

                        <p>
                            Every member, volunteer, and contribution counts. And with this platform, we ensure every effort is recognized, every voice is heard, and every life is touched.
                        </p>
                        <div className='clock-box'>
                            <div className='clock'></div>
                            <p>July 29, 2026</p>
                        </div>
                        
                    </div>
                </div>
                <div className='blog-content-outline-two'>
                    <div className='blog-content-outline-two-row'>
                        <div className='blog-content-outline-grid'>
                            <div className='blog-two'></div>
                            <div className='blog-img-one-letter-repeat '>
                                <h4>
                                    Tax-Saving Strategies for
                                    Small Business
                                </h4>
                                <div className='clock-box'>
                                    <div className='clock'></div>
                                    <p>July 29, 2026</p>
                                </div>
                                
                            </div>
                        </div>
                        <div className='blog-content-outline-grid'>
                            <div className='blog-two'></div>
                            <div className='blog-img-one-letter-repeat '>
                                <h4>
                                    Tax-Saving Strategies for 
                                    Small Business
                                </h4>
                                <div className='clock-box'>
                                    <div className='clock'></div>
                                    <p>July 29, 2026</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className='blog-content-outline-two-row'>
                        <div className='blog-content-outline-grid'>
                            <div className='blog-two'></div>
                            <div className='blog-img-one-letter-repeat '>
                                <h4>
                                    Tax-Saving Strategies for <br />
                                    Small Business
                                </h4>
                                <div className='clock-box'>
                                    <div className='clock'></div>
                                    <p>July 29, 2026</p>
                                </div>
                                
                            </div>
                        </div>
                        <div className='blog-content-outline-grid'>
                            <div className='blog-three'></div>
                            <div className='blog-img-one-letter-repeat '>
                                <h4>
                                    Tax-Saving Strategies for <br />
                                    Small Business
                                </h4>
                                <div className='clock-box'>
                                    <div className='clock'></div>
                                    <p>July 29, 2026</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default UpdateBlog;