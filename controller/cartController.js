import Cart from "../model/cartModel.js";

export const addToCart = async (req, res) =>{
    try {
        const userId = req.user.id;
        const { productId } = await req.body;
        let cart = await Cart.findOne({ user : userId });
        if(!cart) {
            cart = new Cart({
                user : userId,
                products : [{product: productId, quantity : 1}]
            });
        }else{
            const productIndex = cart.products.findIndex(
                p => p.product.toString() === productId
            );

            if(productIndex > -1){
                cart.products[productIndex].quantity +=1 ;
            }else{
                cart.products.push({ product : productId, quantity : 1});
            }
        }
        const data =  await cart.save();
        return res.status(200).json({data, cartCount : cart.products.length, message : 'Product added to cart'});
    } catch (error) {
        console.log('error : ', error, 'req : ', req.user.id);
        
        return res.status(500).json({error : 'Internal server error'});
    }
}