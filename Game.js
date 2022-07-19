var image = "images/cashier.jpg"; // Global variable, represents the image of the cashier
var colors = ["yellow", "blue", "red", "green"]; // Given variable
var types = [1, 3, 4, 5, 6, 7, 8, 9, "changesDirection", "2plush", "stop", "taki"]; // Given variable
var p1, p2, Cashier, TableDeck, turn, gamecolor, index, tempturn, typeandcolor, gametype, cashierimg, totalC, takiCard, Mona, Deep_Blue, save, load, restart ;
// Global variables for the program

// Card object constructor
function Card(type, color)
{
    this.type = type; // Card type
    this.color = color; // Card color
    var imgg = "images/" + this.type + "_" + this.color + ".jpg"; // Build image src
    if (this.type == "ChangeColor") // Check if it is color change card beacuse he has a different image src im our program
        imgg = "images/color_changer.jpg"; // Change color image
    this.img = document.createElement("img");
    this.img.src = imgg; // Dinamicly create card image
    this.img.setAttribute("onclick", "CheckCard(this)");
} 

// Deck object constructor
function Deck()
{
    this.deck = []; // The deck itself, an array 
    this.shuffle = function () // Shuffle function, copied from the exercise we did in class
    {
        let i = this.deck.length, j, temp;
        while (--i > 0)
        {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.deck[j];
            this.deck[j] = this.deck[i];
            this.deck[i] = temp;
        }
    }
    this.createDeck = function () // Deck creation, filling the deck with the game cards
    {
        for (let i = 0; i < colors.length; i++) // Iterate through the color array
        {
            for (let j = 0; j < types.length; j++) // Iterate throguh the type array
            {
                this.deck.push(new Card(types[j], colors[i])); // Create a new card an push him to the deck
            }
        }
        this.deck.push(new Card("ChangeColor", null), new Card("ChangeColor", null)); // Push the 2 Change color cards, they have no color hence we created them here
    }
}
// Computer object constructor
function Computer()
{
    this.cDeck = []; // Computer cards deck
    this.setDeck = function () // Design computer deck for our needs
    {
        for (var c in colors) // Itreate through the colors array
        {
            this.cDeck[colors[c]] = []; // Create a new cell in Cdeck with the key as a color
        }
        for (var c in colors) // Itreate through the colors array
        {
            for (var t in types) // Itreate through the types array
                this.cDeck[colors[c]][types[t]] = []; // Create a new cell in Cdeck[color] with the key as a type
        }
        this.cDeck['change'] = []; // Create a new cell in Cdeck with the key as a change, for changecolor cards
        for (k in this.cDeck)
        {
            this.cDeck[k]['counter'] = 0; // Initalize co counter
        }
    }

    this.updateCounter = function (colortochange) // Update color counters
    {
        this.cDeck[colortochange]['counter']++;
    }
    this.computerAddCard = function (cardToAdd) // Add the card to his right place in cDeck
    {
        if (cardToAdd.type == "ChangeColor") // Check if its changecolor card
        {
            this.cDeck['change'].push(cardToAdd); // If so, put him there
            this.updateCounter('change'); // Update counter
        }
        else
        {
            this.cDeck[cardToAdd.color][cardToAdd.type].push(cardToAdd); //put the Card in his place
            this.updateCounter([cardToAdd.color]); // Update counter
        }
    }
    this.totalCards = function () // Calculate how many cards the computer have
    {
        return this.cDeck['blue']['counter'] + this.cDeck['green']['counter'] + this.cDeck['red']['counter']
            + this.cDeck['yellow']['counter'] + this.cDeck['change']['counter'];
    }
    this.checkForCard = function (cardType) // This function checks if the computer got a card from this type
    {
        for (var c in colors) // Iterate through the color array
        {
            if (this.cDeck[colors[c]][cardType].length == 1) // Check if the computer has this card
                return this.cDeck[colors[c]][cardType][0].img; // If so return him
        }
        return 0; // Else return 0
    }
    this.computerPlay = function () // This function represent the computet game logic, decides which cards the computer would use
    {
        totalC = computer.totalCards(); // Get amount of cards
        gametype = TableDeck[TableDeck.length - 1].type; // Get the type on the table
        var sentcardimg = 0; // A flag
        if (this.cDeck[gamecolor]['taki'].length == 1 && this.cDeck[gamecolor]['counter'] > 2) // Check for taki
        {
            CheckCard(this.cDeck[gamecolor]['taki'][0].img); // If you have taki in this color and 2 other cards in this color use it
        }
        else if (this.cDeck[gamecolor]['stop'].length == 1) // Check for stop
        {
            CheckCard(this.cDeck[gamecolor]['stop'][0].img); // If you have stop in this color use it
        }
        else if (gametype == 'stop' && this.checkForCard('stop') != 0) // If game type is stop check if computer has one in a different color
        {
            sentcardimg = this.checkForCard('stop'); // If so save him
            CheckCard(sentcardimg);
        }
        else if (this.cDeck[gamecolor]['changesDirection'].length == 1) // Check for changesDirection
        {
            CheckCard(this.cDeck[gamecolor]['changesDirection'][0].img); // If you have changesDirection in this color use it
            CheckCard(sentcardimg);
        }
        else if (gametype == 'changesDirection' && this.checkForCard('changesDirection') != 0) // If game type is changesDirection check if computer has one in a different color
        {
            sentcardimg = this.checkForCard('changesDirection'); // If so save him
            CheckCard(sentcardimg);
        }
        else if (this.cDeck[gamecolor]['2plush'].length == 1) // check for 2plush
        {
            CheckCard(this.cDeck[gamecolor]['2plush'][0].img); // If you have 2plush in this color use it
            CheckCard(sentcardimg);
        }
        else if (gametype == '2plush' && this.checkForCard('2plush') != 0)  // If game type is 2plush check if computer has one in a different color
        {
            sentcardimg = this.checkForCard('2plush'); // Save him
            CheckCard(sentcardimg);
        }
        else if (this.cDeck[gamecolor]['counter'] > 0 && this.cDeck[gamecolor]['taki'].length == 0) // Check if you have a regular card of this color
        {
            for (var card in this.cDeck[gamecolor]) // Iterate through this color array to get the card you have
            {
                if (this.cDeck[gamecolor][card].length == 1 && card != 'taki' && card != 'counter') // Check for the card and make sure not to take the taki one if we already checked the first condition
                {
                    sentcardimg = this.cDeck[gamecolor][card][0].img; // Save the card img
                    break; // Finish the loop
                }
            }
            if (sentcardimg != 0) // If we found a card in this color
            {
                CheckCard(sentcardimg); // Use him
            }
        }
        else if (gametype != "ChangeColor" && this.checkForCard(gametype) != 0)
        // Check if you have a card from this type
        {
            sentcardimg = this.checkForCard(gametype); // Call the function that finds him
            if (sentcardimg != 0) // If we found our card 
            {
                CheckCard(sentcardimg); // Use him
            }
        }
        else if (this.cDeck['change']['counter'] > 0) // Check for changecolor card
        {
            gametype = "ChangeColor"; // if so change game type
            CheckCard(this.cDeck['change'][0].img); // Use the card
        }
        else if (totalC < 3 && this.cDeck[gamecolor]['taki'].length == 1) // Special case where we would a taki card even when we dont have 2 cards from his color due to the fact that we have at most 2 cards
        {
            CheckCard(this.cDeck[gamecolor]['taki'][0].img); // If so use it
        }
        else
        {
          takeCard(); // If all conditions were not right take a card
        }
        return;
    }
        this.checkIfcomputerwon = function () // This function checks if the computer won
        {
            if (this.totalCards() ==  0)
            {
                return true;
            }
            else
                return false
    }
    this.writeComputerTolocalStorage = function () // This function writes the computer deck to the localStorage
    {
        var computerCards = []; //Create an array
        for (var k in this.cDeck) // Iterate throguh the computer deck using key
        {
            if (k != 'change') // Iterate only the color arrays
                for (var k2 in this.cDeck[k])  // Check each type
                {
                    if (k2 != 'counter') // We want game cards, so dont want to take the counter
                        computerCards.push(this.cDeck[k][k2][0]); // Push the value in this array
                }
            else if (this.cDeck['change']['counter'] == 2) // If we have 2 change color cards
                computerCards.push(this.cDeck['change'][0], this.cDeck['change'][1]); // Push both
            else if (this.cDeck['change']['counter'] == 1) // If we have one
                computerCards.push(this.cDeck['change'][0]); // Push him
            localStorage.setItem("ComputerDeck", JSON.stringify(computerCards)); // Make a JSON string
        }
    }
        this.readFromLocalStorage = function () // This function reads from the localStorage and insert the cards to the computer deck
        {
            this.setDeck(); // Call setDeck
            var cardstoread = JSON.parse(localStorage.getItem("ComputerDeck")); // Read the data from the localStorage
            for (var p = 0; p < cardstoread.length; p++) // Iterate through the information
            {
                if (cardstoread[p] != null) // If the card exist in the information
                {
                    if (cardstoread[p].type != "ChangeColor") // Check if he is colorchange
                    {
                        this.cDeck[cardstoread[p].color][cardstoread[p].type].push(new Card(cardstoread[p].type, cardstoread[p].color)); // If not put him in his place
                        // Create a new cards in order to have the object special traits
                        this.updateCounter(cardstoread[p].color); // Update counter
                    }
                    else
                    {
                        this.cDeck['change'].push(new Card("ChangeColor", null)); // If so put him in change
                        // Create a new cards in order to have the object special traits
                        this.updateCounter('change'); // Update counter
                    }
                }
            }
        }
    }

    // Playerr object constructor
function Player()
{
        this.pDeck = []; // player deck 
        this.writeTolocalStorage = function () // This function saves player cards in localStorage
        {
            localStorage.setItem("PlayerDeck", JSON.stringify(p1.pDeck)); // Save player deck as a JSON array
        }
        this.readPlayerFromLocalStorage = function () // This function reads player deck from localStorage
        {
            var t = 0; // Counter
            var temp = JSON.parse(localStorage.getItem("PlayerDeck")); // Save the data we read
            for (t = 0; t < temp.length; t++) // Iterate through the data
            {
                if (temp[t].type != "ChangeColor") // Check type
                    p1.pDeck[t] = new Card(temp[t].type, temp[t].color); // Create new card
                else
                    p1.pDeck[t] = new Card("ChangeColor", null);  // Create new card
            }
            if (p1.pDeck.length > temp.length) // If we want to read a game state and in the current the player has more cards than what we read we would like to delete them
            {
                p1.pDeck.splice(t, p1.pDeck.length - t); // Delete spare cards
            }
        }
}

    // start function, our onload function
function start()
{
        document.getElementById("startAgain").innerHTML = ""; // Clear startAgain div.
        Cashier = new Deck();// Create a Deck object
        computer = new Computer(); // Create Computer object
        p1 = new Player(); // Create Player object
        TableDeck = []; // Create tableDeck
        computer.setDeck(); // Oragnize computer deck
        Cashier.createDeck(); // Fill cashier deck with cards
        Cashier.shuffle(); // Shuffle it
        for (let i = 0; i < 8; i++) // Iterate Cashier deck for 8 times
        {
            if (i < 8) // Deal player 1 cards
                p1.pDeck.push(Cashier.deck[i]);
        }
        for (let i = 8; i < 16; i++) // Iterate Cashier deck for 8 times
        { 
            computer.computerAddCard(Cashier.deck[i]); // Deal computer cards
        }
        Cashier.deck.splice(0, 16); // Remove the cards we dealed
        while (Cashier.deck[0].type == "ChangeColor") // We want to take a card from the Cashier and put it on the table but we wont allow it to be color changer
            Cashier.shuffle(); // Shuffle
        TableDeck = [Cashier.deck[0]]; // the card on the table
        Cashier.deck.shift(); // Remove the card we dealed
        turn = 1; // Player one stars
        totalC = computer.totalCards(); // Get computer total cards
        cashierimg = document.createElement("img"); // Create the cashier image object
        Deep_Blue = document.createElement("img"); // Create Img for the computer
        Mona = document.createElement("img"); // Create image for user
        var startAgain = document.getElementById("startAgain"); // Get the footer div
        clear = document.createElement("img"); // Create clear image
        clear.src = "images/clear.jpg"; // Set clear src
        clear.setAttribute("onclick", "clearMemory()"); // Set clear onclick attribute
        load = document.createElement("img"); // Create Loading cannon image
        load.src = "images/loading_cannon.jpg"; // Set Src
        load.setAttribute("onclick", "Load()"); // Set clear onclick attribute
        restart = document.createElement("img"); // Create start again image
        restart.src = "images/start_Again.jpg"; //Set start again src
        restart.setAttribute("onclick", "start()"); // Set clear onclick attribute
        startAgain.appendChild(restart); // Append start again image
        startAgain.appendChild(load); // Append load image
        startAgain.appendChild(clear); // Append clear image
        write(); // Call write function
        gamecolor = TableDeck[0].color; // Save the color that is now in play
}

    // This function changes the turn to the other player
function turnmove()
{
    var checkwin = computer.checkIfcomputerwon();
        if (p1.pDeck.length == 0) // Check if player1 won before changing turn to player2
        {
            alert("Player one won, victoria ex mentis");
        }
        if (checkwin == true)// Check if player2 won before changing turn to player1
        {
            alert("The computer won, victoria ex materia");
        }
        if (turn == 1) // Move turn to computer
        {
            turn = 2;
            setTimeout(function () { computer.computerPlay(); }, 5000); // As requsted the computer would act in a delay, we chose 5 seconds delay
        }
        else
        {
            turn = 1; // Move turn to player 1
        }
    saveGame(); // Save game state in localStorage
}

    //This function writes game information to the proper div elements in our html part
function write()
{
        document.getElementById("player1").innerHTML = ""; // Clear div
        var player1 = document.getElementById("player1"); // Save div in a var
        var Deck = document.getElementById("Deck"); // Save div in a var
        Deck.innerHTML = ""; // Clear the deck div
        var computerDiv = document.getElementById("computer");
        computerDiv.innerHTML = "";
        cashierimg.src = image; // Give cashierimg src
        if(turn == 1) // If turn is 1 make player cards clickable for game
            cashierimg.setAttribute("onclick", "takeCard()");
        else
            cashierimg.setAttribute("onclick", "notYourTurn()"); // Else clicking them would send you to notYourTurn function
        document.getElementById("Deck").innerHTML = ""; // Clear div
        for (let i = 0; i < p1.pDeck.length; i++) // Iterate player1 cards
        {
            var button = document.createElement("button"); // Create buttons
            button.appendChild(p1.pDeck[i].img); // Append the images in to the buttons
            player1.appendChild(button); // Append the buttons to the div
        }
        for (let t = 1; t <= computer.totalCards(); t++)
        {
            takiCard = document.createElement("img"); // Create blank taki card image object
            takiCard.src = "images/TakiCard.jpg"; // Give Src
            computerDiv.appendChild(takiCard); // Append the image
        }
        Mona.src = "images/Thinking.jpg"; // Give mona the src we want
        Deep_Blue.src = "images/Deep_Blue.jpg"; // Give deep blue the src we want
        computerDiv.appendChild(Deep_Blue); // Append Deep blue picture
        player1.appendChild(Mona); // Append mona picture
        Deck.appendChild(cashierimg); // Show cashier image
        if (TableDeck[TableDeck.length - 1].type == "ChangeColor")
        Deck.innerHTML += "<p>" + "The color now is " + gamecolor + "</p>"; // If the table card is change color declare current color
        var button1 = document.createElement("button");  // Create button
        button1.appendChild(TableDeck[TableDeck.length - 1].img); // Append the table card to a button
        Deck.appendChild(button1); // Show table card
        button1.disabled = true; // Disable this button
    if(turn == 1)
        Deck.innerHTML += "<h3>Its player" + turn + " turn</h3>"; // Tell whos turn it is
    else
        Deck.innerHTML += "<h3>Its the computer turn, Satus cogitandi</h3>"; // Tell whos turn it is
}

    // This function is the onclick function for the cards images
function CheckCard(cardimg)
{
    if (turn == 0) // Check if the player is in the process of choosing a color
    {
        ColorPicker(); // If we reached here the player didnt choose color
        return;
    }
    typeandcolor = [];
    typeandcolor[0] = cardimg.src.split("images/")[1].split("_")[0]; // Get the card type from the image src
    typeandcolor[1] = cardimg.src.split("images/")[1].split("_")[1].split(".")[0]; // Get the card color from the image src
    index = -1; // Set index to be an unreachable number
    for (let i = 0; i < p1.pDeck.length; i++) // Iterate throguh player deck
    {
        if (p1.pDeck[i].type == typeandcolor[0] && p1.pDeck[i].color == typeandcolor[1])
            index = i; // Find the index of the card played in player deck
        if (p1.pDeck[i].type == "ChangeColor" && typeandcolor[0] == "color")
        {
            index = i; // Find the index of the card played in player deck if it was color changer
        }
    }
    if ((index == -1 && turn == 1) || (index != -1 && turn == 2)) // If the card is not in the player hand he cant play it or if he clicked the table card during the computer turn 
    {
       notYourTurn(); // If we reached here the card played is not in player deck which means the other player tried to play not in his turn
        return;
    }
        if (typeandcolor[1] == gamecolor || typeandcolor[0] == TableDeck[TableDeck.length - 1].type || typeandcolor[0] == "color") // Check if this is a valid card
        {

            if (checkSpecial(typeandcolor[0], typeandcolor[1]) == false) // Check if it is a special card
            {
                gamecolor = typeandcolor[1]; // Update gamecolor
                CardPlayed(); // If its not a special card just move it to the table deck and out of the player hand
            }
        }
        else // Invalid card
        {
            alert("You tried to play an invalid card, the card would stay in your hand and you would receive one card from the cashier");
            takeCard();
            write(); // Update game information
        }
        return;
    }

    // This function deals with special cards
function checkSpecial(cardtype, cardcolor)
{
        switch (cardtype) // Switch on card type
        {
            case "changesDirection":
            case "stop":
                {
                    // Both of this has the same handling code except a different alert
                    alerts(cardtype); // Call alert
                    if (turn == 1)
                    {
                        TableDeck.push(p1.pDeck[index]); // If its the player turn move the card from him to the deck
                        p1.pDeck.splice(index, 1); // Remove his card from his deck
                    }
                    else
                    {
                        TableDeck.push(computer.cDeck[cardcolor][cardtype][0]); // Else push the card from the computer
                        computer.cDeck[cardcolor][cardtype].pop(); // Remove the computer card
                        computer.cDeck[cardcolor]['counter']--; // Update counter
                        write();
                        setTimeout(function () { computer.computerPlay(); }, 5000); // Delay computer turn
                        saveGame(); // Save game
                    }
                    write(); // call write
                    gamecolor = cardcolor; // Update gamecolor
                    break;
                }
            case "2plush":
                {
                    alerts(cardtype);// Call alert
                    if (Cashier.deck.length >= 2 && turn == 1) // If the the size of the Cashier deck is atleast 2 do nothing speical
                    {
                        computer.computerAddCard(Cashier.deck[0]);
                        computer.computerAddCard(Cashier.deck[1]);
                        Cashier.deck.splice(0, 2); // Remove them
                    }
                    else if (Cashier.deck.length >= 2 && turn == 2) // If the the size of the Cashier deck is atleast 2 do nothing speical
                    {
                        p1.pDeck.push(Cashier.deck[0], Cashier.deck[1]); // Take the 2 cards from the Cashier
                        Cashier.deck.splice(0, 2); // Remove them
                    }
                    else if (Cashier.deck.length < 2 && turn == 2) // If its the player turn to take cards
                    {
                        turnmove(); // Move turn so the other player would be the active one
                        takeCard(); // Take a card from the Cashier
                        turnmove(); // Offest the takecard moveturn
                        takeCard(); // Take a card from the Cashier
                    }
                    else
                    {
                        if (Cashier.deck.length == 1) // If its the computer turn to take cards
                        {
                            computer.computerAddCard(Cashier.deck[0]); // Take last card
                            newCashier(); // Make new Cashier
                            computer.computerAddCard(Cashier.deck[0]); // Take a card
                        }
                        else
                        {
                            newCashier(); // Make new Cashier
                            computer.cardToAdd(Cashier.deck[0]); // Take a card
                            computer.cardToAdd(Cashier.deck[1]); // Take a card
                        }
                        Cashier.deck.splice(0, 2); // Remove taken cards
                    }
                    CardPlayed();
                    gamecolor = cardcolor;
                    break;
                }

            case "taki":
                {
                    alerts(cardtype);
                    var index1 = []; // Create an array to save the indexes of all the cards with this color in our palyer deck
                    if (turn == 1) // If its the player turn
                    {
                        for (let i in p1.pDeck) // Iterate player deck
                        {
                            if (p1.pDeck[i].color == cardcolor) // Check card color
                            {
                                TableDeck.push(p1.pDeck[i]); // If fits add him to table deck
                                index1.push(i); // Put his index in the array
                            }
                        }
                        for (let i = index1.length - 1; i >= 0; i--) // Iterate the player deck backwards and delete the cards that were played
                        {
                            p1.pDeck.splice(index1[i], 1);
                        }
                    }
                    else // Its computer turn
                    {
                        for (let i in computer.cDeck[cardcolor]) // Iterate computer deck
                        {
                            if (computer.cDeck[cardcolor][i].length == 1 && i != 'counter')
                            {
                                TableDeck.push(computer.cDeck[cardcolor][i][0]); // If fits add him to table deck
                                computer.cDeck[cardcolor][i].pop(); // Remove him from the computer deck
                                computer.cDeck[cardcolor]['counter']--; // Update counter
                            }
                        }
                    }
                    turnmove();
                    write();
                    gamecolor = cardcolor;
                    break;
                }

            case "color":
                {
                    tempturn = turn; // Save the current turn
                    if (tempturn == 1)
                    { // If its the player turn
                        turn = 0; // Set turn as 0
                        alerts(cardtype);
                        var change = []; // Create color images array
                        for (let c in colors)
                        {
                            var cimgsrc = "images/" + colors[c] + ".jpg"; // Image src
                            change.push("<img src='" + cimgsrc + "' onclick=" + " changeColor(this)" + " /> "); // Push image to the array
                        }
                        for (let ch in change)
                        {
                            document.getElementById("changeColor").innerHTML += change[ch]; // Write in our new div the images
                        }
                    }
                    else
                    { // Its the computer turn
                        var max = 0; // Flag
                        var newcolor = 'yellow'; // Default color
                        var lengths = []; // Create an array
                        lengths['blue'] = computer.cDeck['blue']['counter']; // Insert all the color counters
                        lengths['red'] = computer.cDeck['red']['counter'];
                        lengths['yellow'] = computer.cDeck['yellow']['counter'];
                        lengths['green'] = computer.cDeck['green']['counter'];
                        for (var m in lengths) // Iterate through the array
                        {
                            if (lengths[m] > max) // Check if the max is smaller than one of the other counters
                            {
                                max = lengths[m]; // If so save him
                                newcolor = m; // Save the color
                            }
                        }
                        gamecolor = newcolor; // Set the game color to be the one with most cards
                        CardPlayed();
                    }
                    break;
                }
            // Default case returns none which means the card is not special
            default:
                {
                    return false;
                }
        }
    }

    // Color images on click function
function changeColor(imgcolor)
{
        document.getElementById("changeColor").innerHTML = ""; // Clear the div
        var chosen = imgcolor.src.split("images/")[1].split(".")[0]; // Keep chosen color value
        gamecolor = chosen; // Update game color
        alert("you chose to change the color to " + chosen);
        turn = tempturn;
        CardPlayed();
        write();
        return;
}

    // Cahsier on click function
function takeCard()
{
    if (turn == 0)
    {
        alert("Change color first");
        return;
    }
    if (Cashier.deck.length == 0) // If the cashier deck is empty we need to take all the cards from the table deck except one
    {
        newCashier();
    }
    if (Cashier.deck.length == 0)
        return;
    if (turn == 1) // If its player turn
    {
        p1.pDeck.push(Cashier.deck[0]); // Take a card from the deck
    }
    else // If its computer turn
    {
        computer.computerAddCard(Cashier.deck[0]); // Take a card from the deck
    }
    Cashier.deck.shift(); // Remove him
    turnmove();
    write();
    return;
}

    // This function is an alerts function, it shows the right alert for each special card type and situation
function alerts(cardtype)
{
        if (cardtype == "changesDirection")
            alert("You played change Direction card, its your turn again");
        if (cardtype == "stop")
            alert("You played Stop card, its your turn again");
        if (cardtype == "color")
            alert("Please choose the color you would like too change to, click on the color you would like");
        if (cardtype == "2plush")
            alert("Your opponent used the 2+ card, you must take 2 cards from the Cashier");
        if (cardtype == "taki")
            alert("You played Taki card, all of the cards from this color in your deck would now be inserted to TableDeck");
        if ((Cashier.deck.length == 0 || Cashier.deck.length == 1) && cardtype == "2plush")
            alert("There are no cards to take from the Cashier, we will insert the tableDeck to the Cashier deck");
        return;
}

    // This function adds the card played to the table deck and remove it from the player deck
function CardPlayed()
{
    if (turn == 1) // If its the player turn
    {
            TableDeck.push(p1.pDeck[index]);
            p1.pDeck.splice(index, 1);
    }
    else // If its the computer turn
    {
        if (typeandcolor[0] == "color") // If its change color
        {
            TableDeck.push(computer.cDeck['change'][0]); // Add to table deck
            computer.cDeck['change']['counter']--; // Update counter
            computer.cDeck['change'].shift(); // Remove him
        }
        else
        {
            TableDeck.push(computer.cDeck[typeandcolor[1]][typeandcolor[0]][0]); // Add to table deck
            computer.cDeck[typeandcolor[1]]['counter']--; // Update counter
            computer.cDeck[typeandcolor[1]][typeandcolor[0]].pop(); // Remove him
        }
    }
    turnmove();
    write();
    return;
    }

    // This function limit player to play only in their turn
function notYourTurn()
{
    alert("Its not your turn");
    return;
}

    // This function moves the cards from the TableDeck to the Cashier
function newCashier()
{
        if (TableDeck.length == 1) // If the table deck has only one card and the Cashier deck is empty, special case
        {
            alert("You cannot take from the cashier right now, first play a card from your hands");
            return;
        }
        else {
            for (let i = 0; i < TableDeck.length - 1; i++) //Iterate through table deck
                Cashier.deck.push(TableDeck[i]); // Push cards to cashier
            TableDeck.splice(0, TableDeck.length - 1); // Delete them from table deck
            Cashier.shuffle(); // Shuffle cashier deck
        }
        return;
}
    // This function dosent allow the user to play if he used color changer and didnt change color
function ColorPicker()
{
        alert("You cant play while you didnt choose a color");
        return;
}
function Load() // This function loads the game state from the localStorage
{
    if (localStorage.ComputerDeck != undefined) // Check if there is something there
    {
        computer.readFromLocalStorage(); // Call computer object built in function
        p1.readPlayerFromLocalStorage(); // Call player object built in function
        loadDecks(Cashier.deck, JSON.parse(localStorage.getItem("CashierDeck")));
        loadDecks(TableDeck, JSON.parse(localStorage.getItem("TableDeck")));
        gamecolor = JSON.parse(localStorage.getItem("Color")); // Load gamecolor
        turn = JSON.parse(localStorage.getItem("Turn")); // Load turn
        if (turn == 2) // Check if its the computer turn if so
        {
            alert("Its the computer Turn");
            setTimeout(function () { computer.computerPlay(); }, 5000); // Delay him and than play
        }
        write();
    }
    else // If the localStorage is empty
    {
        alert("No saved data was found");
    }
}
function loadDecks(deckToLoadTo, deckToLoadFrom)
{
    for (var t = 0; t < deckToLoadFrom.length; t++) // Iterate through it
    {
        if (deckToLoadFrom[t].type != "ChangeColor") // Check type
            deckToLoadTo[t] = new Card(deckToLoadFrom[t].type, deckToLoadFrom[t].color); // Add card
        else
            deckToLoadTo[t] = new Card("ChangeColor", null); // Add change color
    }
}
function saveGame() // This function save the game state
{
    computer.writeComputerTolocalStorage(); // Use computer object builtin function
    p1.writeTolocalStorage();  // Use player object builtin function
    localStorage.setItem("CashierDeck", JSON.stringify(Cashier.deck)); // Save cashier deck
    localStorage.setItem("TableDeck", JSON.stringify(TableDeck)); // Save TableDeck
    localStorage.setItem("Color", JSON.stringify(gamecolor)); // Save the current game color
    localStorage.setItem("Turn", JSON.stringify(turn)); // Save the current turn
}
function clearMemory() // This function allows users to clear the localStorage
{
    localStorage.clear();
}