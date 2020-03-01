let imgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];
let cartesClick = [];

$(document).ready(function () {
    console.log("memory!");
    initialization();
    game();
});

function initialization() {
    let tempImgs = [];

    // copie du tableau imgs x 2 dans un nouveau tableau tempImgs
    for (let i = 0; i < imgs.length; i++) {
        tempImgs.push(imgs[i]);
        tempImgs.push(imgs[i]);
    }

    // modification des index dans tempImgs pour mélanger les cartes
    shuffle(tempImgs);

    // création et insertion des cartes dans le html
    for (let i = 0; i < tempImgs.length; i++) {
        let doggieFile = "img/" + tempImgs[i];
        $(".memory-board").append(
            `<div class="carte-container">
                <div class="carte">
                    <div class="front"></div>
                    <div class="back">
                        <img src="${doggieFile}" alt="">
                    </div>
                </div>
            </div>`)
    }
}

function game() {

    $(".carte").on("click", function () {

        // vérifier que deux cartes ne sont pas déjà retournées
        if (cartesClick.length < 2) {
            console.log(cartesClick);

            // vérifier que la carte cliquée n'est pas déjà retournée
            if ($(this).hasClass("flipped")) {
                return;
            }
            // retourner la carte
            $(this).addClass("flipped");

            // ajout de la carte au tableau comparatif
            cartesClick.push($(this));

            // quand deux cartes ont été cliquées, comparaison de l'image
            if (cartesClick.length == 2) {

                // si identique, cartes restent retournées
                if (cartesClick[0].find('img').attr('src') == cartesClick[1].find('img').attr('src')) {
                    console.log('yay');
                    cartesClick = [];

                } else {

                    // sinon, elles sont remises dans le jeu
                    setTimeout(function () {
                        cartesClick = resetCard(cartesClick);
                    }, 1000);
                }
            }
        }

        // victoire quand toutes les cartes ont été retournées
        if ($(".flipped").length == $(".carte").length) {
            setTimeout(function () {
                $(".victoire").css("display", "block");
                console.log("YOU WON!");
            }, 500);
        }



    });
}

// remet les cartes dans le jeu
function resetCard(tab) {
    $(tab[0]).removeClass("flipped");
    $(tab[1]).removeClass("flipped");
    console.log(tab);
    console.log('nope');
    return [];
}

// shuffles array
function shuffle(array) {
    let j, newArray, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        newArray = array[i];
        array[i] = array[j];
        array[j] = newArray;
    }
    return array;
}