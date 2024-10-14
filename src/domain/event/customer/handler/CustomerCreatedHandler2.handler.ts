import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";

export default class CustomerCreatedHandler2 implements EventHandlerInterface {
    handle(event: EventInterface): void {
        console.log("Esse é o segundo console.log do event CustomerCreated")
    }
}