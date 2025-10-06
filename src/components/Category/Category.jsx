import "./Category.css"

import p1 from '../images/pic1.jpg'
import p2 from '../images/pic2.jpg'
import p3 from '../images/pic3.jpg'
import p4 from '../images/pic4.jpg'
import p5 from '../images/pic5.jpg'
import p6 from '../images/pic6.jpg'


export default function Category() {

    return (
        <>
            <div className="container category my-5">

                    
                <div className="images">
                    <img src={p1} alt="" className="pic1"/>
                    <img src={p2} alt="" className="pic2"/>
                    <img src={p3} alt="" className="pic3"/>
                    <img src={p4} alt="" className="pic4"/>
                    <img src={p5} alt="" className="pic5"/>
                    <img src={p6} alt="" className="pic6"/>
                </div>
            </div>


        </>
    )
}