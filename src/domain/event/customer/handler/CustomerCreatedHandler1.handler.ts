import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";

export default class CustomerCreatedHandler1 implements EventHandlerInterface {
    handle(event: EventInterface): void {
        console.log("Esse é o primeiro console.log do event CustomerCreated")
    }
}