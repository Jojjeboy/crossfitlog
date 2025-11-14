export class List {

    showGif: boolean = false;
    colors: string[] = ["blue", "green", "yellow", "cyan", "pink", "purple"];


    toggleGif() {
        this.showGif = !this.showGif;
        let seconds = 7;
        const interval = setInterval(() => {
            console.log(seconds); // Visar nedräkningen i konsolen
            seconds--;
            if (seconds < 0) {
                this.showGif = false;
                clearInterval(interval);
            }
        }, 1000);
    }
}