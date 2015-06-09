({  
    
    doInit : function(component, event, helper) {
        /*var initAction = component.get("c.sessionId");
        
        initAction.setCallback(this, function(response) {
            alert('sessionID:' + response.getReturnValue());
      	    component.find("sessionId").set("v.value", response.getReturnValue());
        });
        
        $A.enqueueAction(initAction);*/
    },
    
    voteItUp : function(component, event, helper) {
		var optionId = component.get("v.pollOptionId");
        var voteAction = component.get("c.incrementVote");
        voteAction.setParams({ optionId : optionId });
        
        voteAction.setCallback(this, function(response) {
           var state = response.getState();
            if(state === "SUCCESS") {
                //alert(optionId);
                //var targetUpdate = component.get("v.pollOptionId").get("v.label");
                //component.find(targetUpdate).set("v.value", response.getReturnValue());
                document.getElementById(optionId).innerHTML = response.getReturnValue();
            }
        });
        
        $A.enqueueAction(voteAction);

        $.cometd.subscribe('/topic/PollOptionUpdates', function(message) {
            console.log('subscribing');
            var voteTarget = message.data.sobject.Id;
            document.getElementById(voteTarget).innerHTML = JSON.stringify(message.data.sobject.Vote_Count__c);
        });
	},
    
    afterScriptsLoaded : function(component, event, helper) {  
        //var authstring = "OAuth " + component.find("sessionId").get("v.value");
        var authstring = "OAuth " + component.get("v.currentSessionId");

        //authenticate to the Streaming API
        $.cometd.init({
            url: window.location.protocol+'//'+window.location.hostname+'/cometd/29.0/',
            requestHeaders: { Authorization: authstring },
            appendMessageTypeToURL : false
        });
        
        //when the subscribe call was here, it didn't work, the polling never started. Moved it
        //to the vote function which may have its own issues (rescubscribing??) but then it started
        //to work.
    }
})
