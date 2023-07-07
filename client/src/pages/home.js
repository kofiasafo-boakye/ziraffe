import Navbar from "../components/navbar";

const Home = () => {
    return ( 

        <div>

            <Navbar></Navbar>
            Home Page

            <div className="container">
                {/* Other page content */}
                <button className="fixed-button">Post</button>
            </div>
            
        </div>
    );
}
 
export default Home;