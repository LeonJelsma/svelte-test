export default class PongControls {

    private HorizontalMovement: number = 0;

    public constructor() {
        document.addEventListener('keydown', (ev => this.KeyPressed(ev)))
        document.addEventListener('keyup', (ev => this.KeyReleased(ev)))
    }

    private KeyPressed(event: KeyboardEvent) {
        if (event.code == 'KeyW') {
            this.HorizontalMovement = 0.1;
        }
        if (event.code == 'KeyS') {
            this.HorizontalMovement = -0.1;
        }
    }

    private KeyReleased(event: KeyboardEvent) {
        if (event.code == 'KeyW' || event.code == 'KeyS') {
            this.HorizontalMovement = 0;
        }
    }

    public GetHorizontalMovement(): number {
        return this.HorizontalMovement;
    }
}
