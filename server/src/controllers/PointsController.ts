import knex from '../database/connection'
import {Response, Request, NextFunction} from 'express'

class PointsController {
    async create(req: Request,res: Response,next: NextFunction) {
        
        const {
            name, email, whatsapp, latitude, longitude, city, uf, items
        } = req.body;

        const point = {
            image: req.file.filename, 
            name, email, whatsapp, latitude, longitude, city, uf
        }
        
        const trx = await knex.transaction();

        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const point_items = items.split(',')
                                .map((item: string) => Number(item.trim()))
                                .map((item_id: number) => {
                                    return {
                                        point_id,
                                        item_id
                                    };
        });

        
    
        await trx('point_items').insert(point_items);
    
        await trx.commit();

        return res.json({
            id:point_id,
            ...point
        });
    }

    async show(req: Request,res: Response,next: NextFunction) {
        const {id} = req.params;

        const point = await knex('points').where('id',id).first();

        const items = await knex('items').join('point_items', 'items.id','=','point_items.item_id')
            .where('point_items.point_id',id).select('items.title');

        if(!point){
            return res.status(400).json({message:"Point not found."});
        }

        const serializedPoint = {
                ...point,
                image_url: `http://192.168.0.111:3333/uploads/${point.image}`,
        };

        return res.json({point: serializedPoint, items});
    }

    async index(req: Request, res:Response, next:NextFunction){
        const { city, uf , items} = req.query;

        const parsedITems = String(items).split(',').map(item => Number(item.trim()))

        const points = await knex('points').join('point_items','points.id','=','point_items.point_id')
            .whereIn('point_items.item_id', parsedITems)
            .where('city',String(city))
            .where('uf',String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.0.111:3333/uploads/${point.image}`,
            };
        });

        res.json(serializedPoints);
    }

}

export default PointsController;