export class Food {
	private food: Phaser.GameObjects.Image;
	private foodName: string;
	private isSelected: boolean;
	private isLoading: boolean;

	constructor(
		add:  Phaser.GameObjects.GameObjectFactory,
		spawnX: number,
		spawnY: number,
		foodName: string,
	) 
	{
		this.foodName = foodName;
		this.isSelected = false;
		this.isLoading = false;
		this.food = add.image(spawnX, spawnY, foodName);
	}
	getFoodName(): string {
		return this.foodName;
	}

	getIsSelected(): boolean {
		return this.isSelected;
	}

	setIsSelected(state: boolean): void {
		this.isSelected = state;
	}

	getIsLoading(): boolean {
		return this.isLoading;
	}

	setIsLoading(state: boolean): void {
		this.isLoading = state
	}

	onDownSelected(y: number = 100, selectState: boolean): void {
		this.food.setY(y);
		this.isSelected = selectState;
	}
}