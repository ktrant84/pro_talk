$(document).ready(function() {

    function alertShowing() {
        return $("#appAlert").length;
    }

    function addAlert(text, type) {
        if (!alertShowing()) {
            $("#main").prepend("<div id='appAlert' class='alert notification " + type + "'>" + text + "</div>");
        }
    }

    function hideAlert() {
        $("#appAlert").remove();
    }

    function saveStory() {
        var title = $("#story_title").val();
        var content = $("#story_content").val();
        var storyId = $("#story_id").val();
        var genderId = $("#story_gender_id").val();
        var relationshipToAbortionId = $("#story_relationship_to_abortion_id").val();
        var ageRangeId = $("#story_age_range_id").val();

        if (!content) {
            return;
        }

        var payload = {
            story: {
                title: title,
                content: content,
                gender_id: genderId,
                relationship_to_abortion_id: relationshipToAbortionId,
                age_range_id: ageRangeId
            }
        };

        // Turn on loading indicator
        $("#save").addClass("is-loading");

        $.post("/api/v1/stories/" + storyId + "/save", payload)
            .done(function(result, status) {
                hideAlert();
                console.log("Success!", result, status);
            })
            .fail(function(error) {
                addAlert(error.responseJSON.message, "is-danger");
                console.log("FAIL", error, status);
            })
            .always(function() {
                // Turn off loading indicator
                $("#save").removeClass("is-loading");
            });
    }

    // Get the save button
    $("#save").click(function(e) {
        e.preventDefault();
        saveStory();
    });

    $("#publish").click(function() {
        hideAlert();
    });

    var handle = setInterval(saveStory, 10000);

});
