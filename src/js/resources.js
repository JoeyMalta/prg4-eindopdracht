import { ImageSource, Loader } from 'excalibur'

const Resources = {

    // Player sprites
    PlayerHead: new ImageSource('images/T_Playerbody_Head.png'),
    PlayerBodyLeftRight: new ImageSource('images/T_Playerbody_LeftRight.png'),
    PlayerBodyUpDown: new ImageSource('images/T_Playerbody_UpDown.png'),

    // Normale enemy sprites
    EnemyLeft: new ImageSource('images/T_Enemy_Left.png'),
    EnemyRight: new ImageSource('images/T_Enemy_Right.png'),
    EnemyUp: new ImageSource('images/T_Enemy_Up.png'),
    EnemyDown: new ImageSource('images/T_Enemy_Down.png'),

    // Snelle enemy sprites
    GrubLeft: new ImageSource('images/T_Grub_Left.png'),
    GrubRight: new ImageSource('images/T_Grub_Right.png'),
    GrubUp: new ImageSource('images/T_Grub_Up.png'),
    GrubDown: new ImageSource('images/T_Grub_Down.png'),

    // Gameplay objecten
    Projectile: new ImageSource('images/T_Projectile.png'),
    AmmoPickup: new ImageSource('images/T_Ammo_Pickup.png'),

    // Achtergronden en gameover scherm + Void
    Background: new ImageSource('images/T_Background.png'),
    Void: new ImageSource('images/T_Void.png'),
    GameOver: new ImageSource('images/T_GameOver.png')
}

const ResourceLoader = new Loader()

for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }