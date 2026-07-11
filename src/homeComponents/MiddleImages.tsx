import ScrollReveal from "../components/ScrollReveal"


const MiddleImages = () => {
  return (
    <div>
        <div className='middle-images'> 
            <ScrollReveal className="alhaji-img" threshold={0.3}>
                
                
                    <div className='inside-alhaji-img'>
                        <div className='inside-alhaji-icons'>
                            <div className='small-blue-icon'>
                                <div className='small-white-icon-real'></div>
                            </div>
                            <p>Motto</p>
                        </div>
                        <h2>Unity <br />
                            is Strength
                        </h2>
                    </div>
                
            </ScrollReveal>
            <div className='office-three-img'></div>
            
            <ScrollReveal className='office-images'>
                <div className='new-office-content'></div>
                <div className='office-two-img'></div>
            </ScrollReveal>
        </div>
    </div>
  )
}

export default MiddleImages