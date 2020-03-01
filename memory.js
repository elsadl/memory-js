let imgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];
let memoryBoard;
let cartesClick = [];

$(document).ready(function () {
    console.log("memory!");
    initialization();
    game();
});

function initialization() {
    memoryBoard = $(".memory-board");
    let tempImgs = [];

    // copie du tableau imgs x 2 dans un nouveau tableau tempImgs
    for (let i = 0; i < imgs.length; i++) {
        tempImgs.push(imgs[i]);
        tempImgs.push(imgs[i]);
    }

    shuffle(tempImgs);
    console.log(tempImgs);

    // div + images insérées dans le html
    for (let i = 0; i < tempImgs.length; i++) {
        let doggieFile = "img/" + tempImgs[i];
        $(memoryBoard).append(`
        <div class="col-3 p-0 border border-white">
            <div class="carte">
                <div class="cache"></div>
                 <img src="${doggieFile}" alt="">
            </div>
        </div>`)
    }
}

function game() {

    $(".carte").on("click", function () {
        if (cartesClick.length < 2) {
            console.log(cartesClick);

            // ajouter condition : si carte déjà retournée, return

            if ($(this).find("div").hasClass("cache")) {

                $(this).find("div").removeClass("cache");
                // si carte cliquée pas encore retournée, lui ajouter l'attribut retourné
                // $(this).attr('data-face', 'face');
                // console.log($(this).attr('data-face'))
                cartesClick.push($(this));

                if (cartesClick.length == 2) {
                    if (cartesClick[0].find('img').attr('src') == cartesClick[1].find('img').attr('src')) {
                        console.log('yay');
                        // sortir cartes du jeu : les laisser retournées
                        cartesClick = [];

                    } else {
                        // remettre cartes dans le jeu : les retourner

                        setTimeout(function () {
                            cartesClick = resetCard(cartesClick);
                        }, 1000);
                    }
                }
            }
        }

        if($(".cache").length == 0) {
            $(".victoire").css("display", "block");
            console.log("YOU WON!");
        }

        

    });
}

function resetCard(tab) {
    $(tab[0]).find("div").addClass("cache");
    $(tab[1]).find("div").addClass("cache");
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