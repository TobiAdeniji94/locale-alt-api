import { Response, Request } from "express";
import { locationModel } from "../models/locale.model";
import { getSetCache } from "../redis/get-set-cache";

async function getAll(req: Request, res: Response) {
    
}

async function getRegions(req: Request, res: Response) {
    const region_name = req.query.region_name as string;
    const lga = req.query.lga as string;
    let fields = 'state region capital slogan population dialect longitude latitude landmass senatorial_districts created_date known_for borders';

    try {
        if (lga === 'true') {
            fields += ' lgas';
        }

        let regions: any;
        if (!region_name && !lga) {
            res.status(401).send("region_name field is required");
            return;
        } else if (!region_name && lga) {
            regions = await getSetCache(`region?lga=${lga}`, async () => {
                const region = await locationModel.find({}, fields);
                return region;
            });
        } else {
            regions = await getSetCache(
                `region?region_name=${region_name}?lga=${lga}`,
                async () => {
                    const splitName = region_name.split(', ');

                    const mapped: any = splitName.map((region: string) => {
                        let regex = new RegExp(region, 'i');
                        return { region: regex };
                    });

                    const region = await locationModel.find({ $or: mapped }, fields);

                    const inputRegions = splitName.length;
                    const foundRegions = region.length;

                    if (foundRegions < inputRegions) {
                        const notFoundRegions = inputRegions - foundRegions;
                        const errorMessage = `${notFoundRegions} region(s) were not found. Check if input is valid state name(s).`;

                        res.status(404).json({
                            "error": errorMessage,
                            region
                        });
                        return;
                    }
                    return region;
                }
            );
        }

        if (regions) {
            res.status(200).json({ regions });
        }

    } catch (error: any) {
        if (error.message === 'Invalid API_key') {
            res.status(401).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
        return;
    }
}

async function getState(req: Request, res: Response) {
    try {
        const state_name = req.query.state_name as string;
        const lga = req.query.lga as string;
        let fields = 'region state capital slogan population dialect longitude latitude landmass created_date senatorial_districts known_for borders';
        if (lga === 'true') {
            fields += ' lgas';
        }

        let states: any;

        if (!state_name && !lga) {
            res.status(401).send("state_name field is required");
            return;
        } else if (!state_name && lga) {
            states = await getSetCache(`state?lga=${lga}`, async () => {
                const state = await locationModel.find({}, fields);
                return state;
            });
        } else {
            states = await getSetCache(
                `state?state_name=${state_name}?lga=${lga}`,
                async () => {
                    const splitName = state_name.split(', ');
                    const mapped: any = splitName.map((state: string) => {
                        let regex = new RegExp(state, 'i');
                        return { state: regex };
                    });

                    const state = await locationModel.find({ $or: mapped }, fields);
                    const inputStates = splitName.length;
                    const foundStates = state.length;

                    if (foundStates < inputStates) {
                        const notFoundStates = inputStates - foundStates;
                        const errorMessage = `${notFoundStates} state(s) were not found. Check if input is valid state name(s).`;

                        res.status(404).json({
                            "error": errorMessage,
                            state
                        });
                        return;
                    }
                    return state;
                }
            );
        }

        if (states) {
            res.status(200).json({ states });
        }
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
}


async function getLocalGov(req: Request, res: Response) {
    const lga_name = req.query.lga_name as string;

    let fields = 'state lgas region';
    let lgas;

    try {
        if (!lga_name) {
            res.status(401).send("lga_name field is required");
            return;
        } else {
            lgas = await getSetCache(`lga?lga_name=${lga_name}`, async () => {
                const splitName = lga_name.split(', ');
                const mapped: any = splitName.map((lga: string) => {
                    let regex = new RegExp(lga, 'i');
                    return { lgas: regex };
                });
                const lga = await locationModel.find({ $or: mapped }, fields);
                return lga;
            });
        }

        if ((lgas as any[]).length === 0) {
            res.status(404).json({ 
                message: `"${lga_name}" Local Government not found. Check if input is valid local government name`
            });
            return;
        }

        res.status(200).json({
            lgas
        });

    } catch (error: any) {
        res.status(401).json({ error: error.message });
        return;
    }
}

export { getRegions, getState, getLocalGov, getAll }