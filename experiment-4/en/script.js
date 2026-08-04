(function () {

    const SELECTOR = '#slide-0 select[name="select-product-mobile"]';

    const benefits = {
        XCEPA: {
            title: "Xcaret includes:",
            items: [
                "🎟️ Park admission",
                "🌴 50+ activities",
                "🎭 Mexico Espectacular"
            ]
        },
        XCEPL: {
            title: "Xcaret Plus includes:",
            items: [
                "🎟️ Park admission",
                "🍴 Buffet lunch included",
                "🔒 Lockers included",
                "🤿 Snorkeling equipment"
            ]
        }
    };


    function createInfoBox(product) {

        const oldBox = document.querySelector(".cro-product-benefits");

        if (oldBox) {
            oldBox.remove();
        }


        if (!benefits[product]) return;


        const data = benefits[product];

        const box = document.createElement("div");

        box.className = "cro-product-benefits";

        box.innerHTML = `
            <div class="cro-benefits-title">
                ${data.title}
            </div>

            <ul class="cro-benefits-list">
                ${data.items.map(item => `
                    <li>${item}</li>
                `).join("")}
            </ul>
        `;


        const button = document.querySelector(
            '#slide-0 button[name="getYourAdmission"]'
        );


        if (!button) {
            return;
        }


        const container = button.parentElement;


        const infoLink = container.querySelector("a");


        if (infoLink) {

            infoLink.classList.remove(
                "rounded-full",
                "border",
                "py-2"
            );


            infoLink.className = "cro-info-link";

            infoLink.innerHTML = "More information →";
        }


        container.insertBefore(
            box,
            infoLink
        );

    }



    function init() {


        const select = document.querySelector(SELECTOR);


        if (!select) {
            return;
        }


        createInfoBox(select.value);


        select.addEventListener(
            "change",
            function () {
                createInfoBox(this.value);
            }
        );



        const style = document.createElement("style");

        style.innerHTML = `

        .cro-product-benefits {
            margin-top:16px;
            padding:12px 14px;
            background:#f7f7f7;
            border-radius:12px;
            text-align:left;
        }

        .cro-benefits-title {
            font-size:14px;
            font-weight:700;
            color:#214387;
            margin-bottom:8px;
        }

        .cro-benefits-list {
            margin:0;
            padding:0;
            list-style:none;
        }

        .cro-benefits-list li {
            font-size:13px;
            color:#5c5c5c;
            margin-bottom:6px;
            line-height:1.4;
        }

        .cro-info-link {
            display:flex !important;
            justify-content:center;
            width:100%;
            margin-top:8px;
            font-size:13px !important;
            color:#214387 !important;
            text-transform:none !important;
            border:none !important;
            padding:4px !important;
        }

        `;


        document.head.appendChild(style);

    }


    init();


})();
