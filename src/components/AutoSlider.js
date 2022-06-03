import React,{useState,useEffect} from 'react';

const colorss = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 3000;
function SlideShow(){
    const [index, setIndex] = useState(0);
    const timeoutRef = React.useRef(null);
    const colors = [
        {
            imgpath: require('../image/HomeImage1.jpg')
        },
        {
            imgpath:require('../image/HomeImage2.jpg')
        }
    ];
    const len = colors.length;
    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    useEffect(()=>{
        resetTimeout();
        timeoutRef.current = setTimeout(()=>setIndex((prevIndex) =>
        prevIndex=== len-1 ? 0 : prevIndex+1
        ), delay);
        return () => {resetTimeout();};
    },[index]);
    return(
        <div className='slideshow'>
            <div className='slideshowSlider' style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
            {colors.map(({imgpath}, index) => {
            return(
                <div className="slide" key={index} >
                <img src={imgpath} alt="E-Stock" className='responsiveImg'></img>
                </div>
           )
        })}
            </div>
            <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div key={idx} className={`slideshowDot${index === idx ? " active" : ""}`}
          onClick={() => {
            setIndex(idx);
          }}></div>
        ))}
      </div>
        </div>
    )
}
export default SlideShow;