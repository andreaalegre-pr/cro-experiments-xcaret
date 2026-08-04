(function () {

    const products = {
        XCEPA: {
            title: "Xcaret incluye:",
            items: [
                "🎟️ Entrada al parque",
                "🌴 Más de 50 actividades",
                "🎭 México Espectacular"
            ]
        },
        XCEPL: {
            title: "Xcaret Plus incluye:",
            items: [
                "🎟️ Entrada al parque",
                "🍴 Buffet incluido",
                "🔒 Lockers incluidos",
                "🤿 Equipo de snorkel"
            ]
        }
    };


    function renderBenefits(select) {

        const value = select.value;

        const card = select.closest(".w-\\[80\\%\\]");

        if (!card) {
            console.log("No encontró card");
            return;
        }


        const button = card.querySelector(
            'button[name="getYourAdmission"]'
        );

        if (!button) {
            console.log("No encontró botón");
            return;
        }


        const actions = button.parentElement;


        // eliminar versión anterior
        const old = actions.querySelector(".cro-product-benefits");

        if (old) old.remove();


        if (!products[value]) return;


        const box = document.createElement("div");

        box.className = "cro-product-benefits";

        box.innerHTML = `
            <strong>${products[value].title}</strong>
            <ul>
                ${products[value].items
                .map(item => `<li>${item}</li>`)
                .join("")}
            </ul>
        `;


        const link = actions.querySelector("a");


        if (link) {
            link.className = "cro-info-link";
            link.innerHTML = "Más información →";
        }


        actions.insertBefore(
            box,
            link
        );


    }



    function init(){

        const selects = [
            ...document.querySelectorAll(
                'select[name="select-product-mobile"]'
            )
        ];


        const parksSelect = selects.find(
            s => [...s.options].some(
                o => o.value === "XCEPA"
            )
        );


        if(!parksSelect){
            console.log("No encontró selector de parques");
            return;
        }


        renderBenefits(parksSelect);


        parksSelect.addEventListener(
            "change",
            () => renderBenefits(parksSelect)
        );


        const style = document.createElement("style");

        style.innerHTML = `

        .cro-product-benefits{
            margin:14px 0;
            padding:12px;
            background:#f7f7f7;
            border-radius:12px;
            text-align:left;
            font-size:13px;
            color:#5c5c5c;
        }

        .cro-product-benefits strong{
            display:block;
            color:#214387;
            font-size:14px;
            margin-bottom:8px;
        }

        .cro-product-benefits ul{
            padding:0;
            margin:0;
            list-style:none;
        }

        .cro-product-benefits li{
            margin-bottom:5px;
        }

        .cro-info-link{
            display:flex!important;
            justify-content:center;
            margin-top:8px;
            font-size:13px!important;
            color:#214387!important;
            border:none!important;
            padding:4px!important;
            text-transform:none!important;
        }

        `;

        document.head.appendChild(style);

    }


    init();

})();
