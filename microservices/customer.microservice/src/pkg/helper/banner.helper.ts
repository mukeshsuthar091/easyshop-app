import { Injectable } from "@nestjs/common";
import { Model } from "sequelize";
import { db } from "src/modules";


@Injectable()
export class BannerHelper {

    async GetBanners(): Promise<Array<any>> {
        try {
            const banners = await db.Banner.findAll(
                {
                    attributes: ['id', 'image', 'productId', 'createdAt', 'updatedAt'],
                    include: {
                        model: db.Product,
                        attributes: ['id', 'name', 'description', 'additional_info', 'additional_details', 'rate_avg', 'rate_count', 'order_count', 'createdAt', 'updatedAt'],
                        include: [
                            {
                                model: db.ProdImage,
                                attributes: ['id', 'image', 'createdAt', 'updatedAt']
                            },
                            {
                                model: db.ProdColor,
                                attributes: ['id', 'color', 'createdAt', 'updatedAt']
                            },
                            {
                                model: db.ProdSize,
                                attributes: ['id', 'size', 'price', 'createdAt', 'updatedAt']
                            },
                            {
                                model: db.ProdSpec,
                                attributes: ['id', 'title', 'value', 'createdAt', 'updatedAt']
                            }
                        ]
                    }
                }
            );

            return banners;
        } catch (error) {
            throw error;
        }
    }
}