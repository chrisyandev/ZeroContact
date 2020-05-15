// Creates the progress bars. When progress bar changes, checks if game is over.
$('#physical').progressbar({
    value: 50
});
$('#mental').progressbar({
    value: 50
});
$('#wealth').progressbar({
    value: 50
});
$('#supplies').progressbar({
    value: 50
});

// Logic when event received
$(document.body).on('update-resources', function (event, effect) {
    updateProgressBars(effect);
    $(document.body).trigger('pick-next-card', checkGameOver());
});

/** Updates the progress bars' fill. */
function updateProgressBars(effect) {
    let newPhysical = add($('#physical').progressbar('value'), effect.physical);
    $('#physical').progressbar('value', newPhysical);
    changeFillColor($('#physical').find('.ui-progressbar-value'), effect.physical);

    let newMental = add($('#mental').progressbar('value'), effect.mental);
    $('#mental').progressbar('value', newMental);
    changeFillColor($('#mental').find('.ui-progressbar-value'), effect.mental);

    let newWealth = add($('#wealth').progressbar('value'), effect.wealth);
    $('#wealth').progressbar('value', newWealth);
    changeFillColor($('#wealth').find('.ui-progressbar-value'), effect.wealth);

    let newSupplies = add($('#supplies').progressbar('value'),effect.supplies);
    $('#supplies').progressbar('value', newSupplies);
    changeFillColor($('#supplies').find('.ui-progressbar-value'), effect.supplies);
}

/** Helper method that makes sure result is between 0 and 100. */
function add(a, b) {
    let result = a + b;
    if (result < 0) {
        return 0;
    }
    if (result > 100) {
        return 100;
    }
    return result;
}

/** 
 * Changes progress bar color when it's transitioning.
 * Timeout should match transition: width (time).
 * Color is determine by whether change is positive or negative.
 */
function changeFillColor($fill, choiceStat) {
    if (choiceStat < 0) {
        $fill.css({
            'background-color': '#761F1A',
            'transition': 'width 0.5s'
        });
    } else if (choiceStat > 0) {
        $fill.css({
            'background-color': '#639A7F',
            'transition': 'width 0.5s'
        });
    }
    setTimeout(function() {
        $fill.css({
            'background-color': 'tan',
            'transition': 'background-color 0.2s ease'
        });
    }, 500);
}

/** If stat is 0, game over */
function checkGameOver() {
    if ($('#physical').progressbar('value') <= 0) {
        return true;
    }
    if ($('#mental').progressbar('value') <= 0) {
        return true;
    }
    if ($('#wealth').progressbar('value') <= 0) {
        return true;
    }
    if ($('#supplies').progressbar('value') <= 0) {
        return true;
    }
    return false;
}