({
	doInit : function(component, event, helper) {
		//get the latest poll question and its options
		//populate the component
		var action = component.get("c.latestPoll");
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if(state === "SUCCESS") {
                //alert(response.getReturnValue());
                component.set("v.pollQuestion", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
        
        var sessionAction = component.get("c.sessionId");
        sessionAction.setCallback(this, function(response) {
           var state = response.getState();
            if(state  === "SUCCESS") {
                component.set("v.sessionId", response.getReturnValue());
            }
        });
        $A.enqueueAction(sessionAction);
	}
})
