import * as yup from 'yup';

export const cropSchema = yup.object({
  plant_name: yup.string().required().max(100),
  bed_column: yup.string().required().max(10),
  number: yup.number().required().max(10),
  origin_id: yup.number().integer().nullable().required(),
  source_crop_id: yup.string().uuid().nullable(),
  production_cycle_grams: yup.number().integer().min(0).nullable(),
  notes: yup.string().nullable(),
});

export const cropEventSchema = yup.object({
  crop_id: yup.string().uuid().required(),
  event_type: yup
    .mixed<'Plantio' | 'Transplante' | 'Solo Fixo' | 'Primeira Flor' | 'Primeira Colheita' | 'Retirada'>()
    .oneOf(['Plantio', 'Transplante', 'Solo Fixo', 'Primeira Flor', 'Primeira Colheita', 'Retirada'], '')
    .required(),
  event_date: yup.date().required(),
});
