import * as yup from 'yup';

export const cultivationSchema = yup.object({
  plant_name: yup.string().required().max(100),
  bed_column: yup.string().required().max(10),
  number: yup.number().required().max(10),
  origin_id: yup.number().integer().nullable().required(),
  source_crop_id: yup.string().uuid().nullable(),
  production_cycle_grams: yup.number().integer().min(0).nullable(),
  notes: yup.string().nullable(),
});
