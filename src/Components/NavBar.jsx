import AppleNoBack from "../assets/AppleNoBack.png";
import cartEmpty from "../assets/cart-empty.png";
import cartFull from "../assets/cart-full.png";

export default function NavBar({isCartEmpty}){
    return (
        <div className="NavBar">
            <h2>Hello!</h2>
            <h1>Groceries App {" "}
                <img 
                style={{backgroundColor: "rgb(76, 43, 226)"}}
                src={AppleNoBack} 
                alt="" 
                height="50px" />
            </h1>
            {/*Decides whether to display empty or full cart image based on if cart has items at all*/}
            <img src={isCartEmpty ? cartEmpty : cartFull} 
            alt="Cart" height="50px"/>
        </div>
    );
};