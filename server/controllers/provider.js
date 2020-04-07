import { compact } from 'lodash';
import DataFieldService from '@/services/datafield';
import { Provider, DataFields } from '@/models';
import SequelizeHelperService from '@/services/sequelize-helper';

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.providerResource = finale.resource({
      model: Provider,
      endpoints: [prefix, `${prefix}/:id`],
    });

    this.providerResource.create.write_after(async (req, res, context) => {
      let { type, topics = [] } = req.body;
      type = Number(type);

      const datafields = compact([
        type,
        ...topics,
      ]);

      const { includeLoadInstruction: datafieldsLoad } = await DataFieldService.addToModel(context.instance, datafields);
      context.instance = await SequelizeHelperService.load(context.instance, [datafieldsLoad]);

      return context.continue;
    });

    this.providerResource.update.write_after(async (req, res, context) => {
      let {
        type: newProviderType,
        topics: newTopics,
      } = req.body;

      newProviderType = Number(newProviderType);

      const datafields = compact([
        newProviderType,
        ...newTopics,
      ]);

      await context.instance.setDataFields([]);
      const { includeLoadInstruction: datafieldsLoad } = await DataFieldService.addToModel(context.instance, datafields);
      context.instance = await SequelizeHelperService.load(context.instance, [datafieldsLoad]);


      return context.continue;
    });
  }
}
