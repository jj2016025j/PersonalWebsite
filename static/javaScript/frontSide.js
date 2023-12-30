import { sendMessage } from 'openai.js';
//frontSide.js
function createUI() {
    createHeader()
    createFooter()
}

//addEventListener 這個不知道該放哪裡
function initializeEventListeners() {
    //幫產品加上送出資料的功能
    const hotProductList = document.getElementById('hot-product-list');
    const allProductList = document.getElementById('all-product-list');
    const productList = [hotProductList, allProductList];

    productList.forEach(element => {

        element?.addEventListener('click', (event) => {
            const link = event.target.closest('.product-name');
            if (!link) return; // 如果点击的不是产品链接，退出
            event.preventDefault(); // 阻止链接的默认跳转行为
            const productName = link.textContent; // 获取产品名称
            const product = { name: productName }; // 创建一个包含产品信息的对象
            localStorage.setItem('currentProduct', JSON.stringify(product));
            window.location.href = 'productInfo.html'; // 跳转到产品信息页面
        });
    })

    //登出
    document.getElementById('logout')?.addEventListener('click', function () {
        localStorage.removeItem('currentUser');
        updateUserInfo()
    })

    //發送
    document.getElementById('chatForm')?.addEventListener('submit', function (event) {
        event.preventDefault();
        sendMessage(true);
    });
}

//============================================更新區
function updateUserInfo() {
    if (!document.getElementById('UserInformation'))
        return
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userDetails = users.find(user => user.username === currentUser);

    updateList('UserInformation', userDetails, 'userInfo');
}

//========================更新畫面
function updateList(elementId, items, type) {
    const element = document.getElementById(elementId);

    if (element === null) return;

    let htmlContent = "";
    if (Array.isArray(items)) {
        items.forEach(item => {
            htmlContent += generateHtmlContent(type, item);
        });
    } else {
        htmlContent = generateHtmlContent(type, items);
    }
    element.innerHTML = htmlContent;
}

//========================根據類型回傳
function generateHtmlContent(type, item) {
    switch (type) {
        case 'product':
            return `
                <div class="product-card d-flex flex-column justify-content-center shadow rounded-lg ps-0 pe-0 overflow-hidden" style="min-width: 200px;">
                    <div class="img" style="background-image: url(${item.image});"></div>
                    <a class="col-11 product-name pt-1" href="#"><b>${item.name}</b></a>
                    <a class="col-11 product-price">$${item.price}</a>
                </div>
            `;
        case 'category':
            return `
                <div class="classification-option category shadow-sm" id="category">${item}</div>
            `;
        case 'sub-category':
            return `
                <div class="classification-option sub-category shadow-sm" id="sub-category">${item}</div>
            `;
        case 'userInfo':
            if (item) {
                return `
                    <p id="username">${item.username}</p>
                    <p id="email" class="mt-2">信箱: ${item.email || '無'}</p>
                    <p id="currency">魔法幣: ${item.currency || '0'}</p>
                    <a href="" id="logout">登出</a>
                `;
            } else {
                return `
                    <h3 class="mt-5">尚未登入</h3>
                    <a href="login.html" class="mt-2 mb-5 btn btn-primary">去登入</a>
                `;
            }
        default:
            return '';
    }
}

function showMessage(type, message) {
    const messageContainer = document.getElementById('message-container');
    const messageType = {
        'success': '成功！',
        'warning': '警告！',
        'danger': '錯誤！',
        'info': '提示！'
    };

    messageContainer.innerHTML = `<div class="alert alert-${type}"><strong>${messageType[type]}</strong> ${message}</div>`;

    setTimeout(() => {
        messageContainer.innerHTML = '';
        if (type === 'success') {
            setTimeout(() => {
                window.location.href = 'portfolio.html';
            }, 1000);
        }
    }, 2000);
}

//============================================生成區
function createHeader() {
    const header = document.querySelector('header')
    if (header) {
        header.innerHTML = `
        <h1 class="note-sans-black logo">艾格魯的店</h1>
        <nav class="bg-opacity-50">
            <ul>
                <li><a href=./index.html>HOME</a></li>
                <li><a href=./store.html>STORE</a></li>
                <li><a href=./tool.html>TOOL</a></li>
                <li><a href=./about.html>ABOUT</a></li>
                <li><a href=./portfolio.html>PORTFOLIO</a></li>
            </ul>  
        </nav>
    `;
    }
    //導航欄特效
    window.addEventListener('scroll', function () {
        var navbar = document.getElementById('navbar');
        if (!navbar) return
        if (window.pageYOffset > navbar.offsetTop) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
}

function createFooter() {
    const footer = document.getElementsByTagName('footer')[0];
    footer.classList.add("bg-black", "text-white");
        if (footer) {
        footer.innerHTML = `
    <div class="d-flex row justify-content-around">
        <div class="col-md-5 d-flex justify-content-around mt-3" style="width: 50%">
            <a href="https://github.com/jj2016025j"><i class="bi bi-github"></i></a>
            <a href="https://www.facebook.com/lee871116/"><i class="bi bi-facebook" size="2x"></i></a>            
            <a href="https://www.instagram.com/lee_871116"><i class="bi bi-instagram"></i></a>           
            <a href="https://twitter.com/LEECS871116"><i class="bi bi-twitter"></i></a>
            <a href="https://www.youtube.com/channel/UCdFWtSFizZFpBovsUY7ZKyg"><i class="bi bi-youtube"></i></a>
            <a href="https://www.behance.net/d71ea9ce"><i class="bi bi-behance"></i></a>
            <a href="https://www.linkedin.com/in/%E5%BB%BA%E9%99%9E-%E6%9D%8E-3145931b2/"><i class="bi bi-linkedin"></i></a>
            <a href="linkfly.to/leecs871116"><i class="bi bi-link"></i></a>
            <a href="https://jj2016025j.github.io/WebPractice20230826/"><i class="bi bi-browser-chrome"></i></a>
        </div>
        <div class="col-md-5 d-flex justify-content-around text-center mt-3" style="width: 50%;">
            <a href="https://www.canva.com/design/DAF4PrNLaIc/XBZqJm5EFzzmeLM4V6hkFQ/edit?ui=eyJHIjp7fX0" target="_blank"
            rel="noopener noreferrer">
                隱私權政策</a>
            <a href="https://www.canva.com/design/DAF4PrNLaIc/XBZqJm5EFzzmeLM4V6hkFQ/edit?utm_content=DAF4PrNLaIc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" target="_blank"
            rel="noopener noreferrer">
                使用者協議</a>
            <a href="./about.html" target="_blank" rel="noopener noreferrer">
                公司簡介</a>
            <a href="mailto:jj2016025j@gmail.com.com" target="_blank" rel="noopener noreferrer">
                聯絡我們</a>
        </div>
    </div>
    <br>
    <div class="row text-center justify-content-evenly">
        <div class="col-md-5">
            <p>
                本網站所提供的所有產品與服務資訊，包括但不限於價格、描述、可用性及性能等，
                均“如其所是”地提供，且不含任何形式的保證或聲明。我們不對任何產品或服務的準確性、
                可靠性或適用性作出任何保證。使用這些產品或服務所產生的風險完全由用戶自行承擔。
            </p>
            <p>
                All product and service information provided on this website, 
                including but not limited to prices, descriptions, availability, 
                and performance, are provided "as is" without any form of guarantee or representation. 
                We make no guarantees regarding the accuracy, reliability, 
                or applicability of any product or service. 
                The risk associated with the use of these products or services is entirely borne by the user.
            </p>
        </div>
        <div class="col-md-5">
            <p>
                本網站中的所有內容，包括文字、圖形、標誌、按鈕圖標、圖像、音頻剪輯、數位下載、數據編輯和軟件，
                均為網站擁有者或其內容提供者的財產，並受國際版權法的保護。本網站的所有內容僅用於信息和個人非商業用途，
                在未經明確的書面許可下，不得以任何形式複製、再發布、上傳、發布、傳播或分發。
            </p>
            <p>
                All content on this website, including text, graphics, logos, 
                button icons, images, audio clips, digital downloads, data compilations, and software, 
                is the property of the website owner or its content providers and is protected by international copyright laws. 
                The content of this website is intended for informational and personal non-commercial use only and may not be reproduced, 
                republished, uploaded, posted, transmitted, or distributed in any form without explicit written permission.
            </p>
        </div>
        <a href="https://www.canva.com/design/DAF4PrNLaIc/XBZqJm5EFzzmeLM4V6hkFQ/edit?ui=eyJHIjp7fX0" class="mb-5">Copyright © 2023 建陞教練的工作室 All Rights Reserved.</a>
    </div>
    `;
    }
}

export {
    createUI, createHeader, createFooter, updateUserInfo,
    updateList, initializeEventListeners, showMessage
};