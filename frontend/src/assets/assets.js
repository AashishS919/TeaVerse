import logo from './logo.png'
import profile_icon from './profile_icon.png'
import search_icon from './search_icon.png'
import cart_icon from './cart_icon.png'
import menu_icon from './menu_icon.png'
import main_banner from './main_banner.jpg'
import main_banner_sm from './main_banner_sm.jpg'
import arrow from './arrow.png'
import leftarrow from './leftarrow.png'
import remove from './remove.png'
import blacktea_icon from './blacktea_icon.png'
import greentea_icon from './greentea_icon.png'
import oolongtea_icon from './oolongtea_icon.png'
import rooibos_icon from './rooibos_icon.png'
import caffienefree_icon from './caffienefree_icon.png'
import puerh_icon from './puerh_icon.png'
import matcha_icon from './matcha_icon.png'
import star_icon from './star_icon.png'
import stardull_icon from './stardull_icon.png'
import tropicalgreentea from './tropicalgreentea.jpg'
import matcha_powder from './matcha_powder.jpg'
import tikuanyin from './tikuanyin.jpg'
import earlgrey from './earlgrey.jpg'
import africanwinter from './africanwinter.jpg'
import lemongreendecaf from './lemongreendecaf.jpg'
import assamdecaf from './assamdecaf.jpg'
import darjeelingdecaf from './darjeelingdecaf.jpg'
import Add_Address from './Add_Address.png'
import upload_area from './upload_area.png'
import teabox_icon from './teabox_icon.png'
import masalachai from './masalachai.jpg'
import goldennepal from './goldennepal.jpg'



export const assets = {
    logo,
    profile_icon,
    search_icon,
    cart_icon,
    menu_icon,
    main_banner,
    main_banner_sm,
    arrow,
    leftarrow,
    remove,
    star_icon,
    stardull_icon,
    tropicalgreentea,
    matcha_powder,
    tikuanyin,
    earlgrey,
    africanwinter,
    lemongreendecaf,
    assamdecaf,
    darjeelingdecaf,
    Add_Address,
    upload_area,
    teabox_icon,
    masalachai,
    goldennepal,
    
    
}

export const categories =[
    {
        text: "Black Tea",
        path: "Blacktea",
        image: blacktea_icon,
    },
    {
        text: "Green Tea",
        path: "Greentea",
        image: greentea_icon
    },
    {
        text: "Oolong Tea",
        path: "Oolongtea",
        image: oolongtea_icon
    },
    {
        text: "Rooibos Tea",
        path: "Rooibostea",
        image: rooibos_icon
    },
    {
        text: "Caffiene free Tea",
        path: "Caffienefreetea",
        image: caffienefree_icon
    },
    {
        text: "Pu-Erh Tea",
        path: "Puerhtea",
        image: puerh_icon
    },
    {
        text: "Matcha",
        path: "Matchatea",
        image: matcha_icon
    },
   
]

export const dummyProducts = [
    //green tea
    {
        _id: "001",
        name: "Tropical Green",
        category: "Greentea",
        price: 2500,
        offerPrice: 2300,
        image: [tropicalgreentea],
        description: [
            "Fresh and organic",
            "Healthy"
        ],
        createdAt: "2025-04-25",
        updatedAt: "2025-04-25",
        inStock: true,
    },
    {
        _id: "002",
        name: "African Winter",
        category: "Rooibostea",
        price: 4400,
        offerPrice: 2300,
        image: [africanwinter],
        description: [
            "Fresh and organic",
            "Healthy"
        ],
        createdAt: "2025-04-25",
        updatedAt: "2025-04-25",
        inStock: true,
    },
    {
        _id: "003",
        name: "Ti Kuan Yin",
        category: "Oolongtea",
        price: 4420,
        offerPrice: 2330,
        image: [tikuanyin],
        description: [
            "Fresh and organic",
            "Healthy"
        ],
        createdAt: "2025-04-25",
        updatedAt: "2025-04-25",
        inStock: true,
    },
    {
        _id: "004",
        name: "Earl Grey",
        category: "Blacktea",
        price: 1500,
        offerPrice: 1300,
        image: [earlgrey],
        description: [
            "Fresh and organic",
            "Healthy"
        ],
        createdAt: "2025-04-25",
        updatedAt: "2025-04-25",
        inStock: true,
    },
    {
        _id:"005",
        name: "Organic Matcha",
        category: "Matchatea",
        price: 5000,
        offerPrice: 3000,
        image:[matcha_powder],
        description:[
            "Healthy"
        ],
        createdAt: "2025-04-23",
        updatedAt: "2025-04-23",
        inStock: true,

    },
    {
        _id: "006",
        name: "Lemon Green Decaf",
        category: "Caffeinefreetea",
        price: 2000,
        offerPrice: 1900,
        image: [lemongreendecaf],
        description: [
            "Fresh and organic",
            "Healthy"
        ],
        createdAt: "2025-04-25",
        updatedAt: "2025-04-25",
        inStock: true,
    },
    {
        _id: "007",
        name: "Assam Decaf",
        category: "Caffeinefreetea",
        price: 2000,
        offerPrice: 1900,
        image: [assamdecaf],
        description: [
            "Fresh and organic",
            "Healthy"
        ],
        createdAt: "2025-04-25",
        updatedAt: "2025-04-25",
        inStock: true,
    },
    {
        _id: "008",
        name: "Darjeeling Decaf",
        category: "Caffeinefreetea",
        price: 2000,
        offerPrice: 1900,
        image: [darjeelingdecaf],
        description: [
            "Fresh and organic",
            "Healthy"
        ],
        createdAt: "2025-04-25",
        updatedAt: "2025-04-25",
        inStock: true,
    },
]

export const footerLinks =[
    {
        title :"Quick Links",
        links:[
            { text: "Home", url: '#'},
            { text: "Best Sellers", url: '#'},
            { text: "Categories", url: '#'},
            { text: "Contact Us", url: '#'},
            { text: "FAQs", url: '#'},
        ],
    },
    {
        title: "Need help?",
        links:[
            { text: "Delivery Information", url: '#'},
            { text: "Return & Refund Policy", url: '#'},
            { text: "Payment Methods", url: '#'},
            { text: "Track Your Order", url: '#'},
            { text: "Contact Us", url: '#'},

            
        ],
    },
    {
        title: "Follow Us",
        links:[
            { text: "Instagram", url: '#'},
            { text: "Twitter", url: '#'},
            { text: "Facebook", url: '#'},
            { text: "Youtube", url: '#'},
           

            
        ],
    }
]

export const product =[ 
    {
    _id: "001",
        name: "Tropical Green",
        category: "Greentea",
        price: 2500,
        offerPrice: 2300,
        image: [tropicalgreentea],
        description: [
            "Fresh and organic",
            "Healthy"
        ],
        createdAt: "2025-04-25",
        updatedAt: "2025-04-25",
        inStock: true,
    }
]

export const dummyAddress = [
    {
        _id:"13513gds",
        userId: "313413t1",
        firstName:'John',
        lastName:'Doe',
        email:'john@gmail.com',
        street:'street123',
        city: 'kathmandu',
        state: 'Bagmati',
        zipcode:44500,
        country: "NP",
        phone: "123456789",

    },
];  

export const dummyOrders = [

]