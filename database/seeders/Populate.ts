import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'
export default class extends BaseSeeder {
  public async run() {

    const list = "Orgy,Anal,Role Play,Voyeurism,Threesome,Foot Fetish,Dominantion and Submission,Bondage,Cuckolding,Wax Play"
    const interests = "Travel,Outdoors,Music,Reading,Writing,Art,Photography,Cooking,Video Games,Board Games,Card Games,Tabletop Games,Comics,TV Shows,Books,Podcasts,Food,Drinks,Tea,Coffee,Beer,Wine,Alchohol,Fishing,Dogs,Cats,Sports,Dancing"
    // populate categories with NSFW interests

    for (const category of list.split(',')) {
      await Category.create({ name: category, nsfw: true })
    }
    // populate categories with SFW interests
    for (const category of interests.split(',')) {
      await Category.create({ name: category, nsfw: false })
    }

  }
}
