import { faker } from "@faker-js/faker";
import {
  BodyType,
  ClassifiedStatus,
  Color,
  CurrencyCode,
  FuelType,
  OdometerUnit,
  Prisma,
  PrismaClient,
  Transmission,
} from "@prisma/client";
import slug from "slug";

export const seedClassifieds = async (prisma: PrismaClient) => {
  const makes = await prisma.make.findMany({
    include: {
      models: {
        include: {
          modelVariants: true,
        },
      },
    },
  });

  const classifiedsData: Prisma.ClassifiedCreateManyInput[] = [];

  for (let i = 0; i < 69; i++) {
    const make = faker.helpers.arrayElement(makes);
    if (!make.models.length) continue;
    const model = faker.helpers.arrayElement(make.models);
    const variant = model.modelVariants.length
      ? faker.helpers.arrayElement(model.modelVariants)
      : null;
    const year = faker.date
      .between({
        from: new Date(1925, 0, 1),
        to: new Date(),
      })
      .getFullYear();
    const title = [year, make.name, model.name, variant?.name]
      .filter(Boolean)
      .join(" ");
    const vrm = faker.vehicle.vrm();
    const baseSlug = slug(`${title}-${vrm}`);
    classifiedsData.push({
      year: year,
      vrm: vrm,
      slug: baseSlug,
      makeId: make.id,
      modelId: model.id,
      ...(variant?.id && { modelVariantId: variant.id }),
      title: title,
      price: faker.number.int({ min: 400000, max: 10000000 }),
      odometerReading: faker.number.int({ min: 0, max: 200000 }),
      odometerUnit: faker.helpers.arrayElement(Object.values(OdometerUnit)),
      doors: faker.number.int({ min: 2, max: 5 }),
      seats: faker.number.int({ min: 2, max: 8 }),
      views: faker.number.int({ min: 0, max: 10000 }),
      description: faker.commerce.productDescription(),
      currency: CurrencyCode.USD,
      bodyType: faker.helpers.arrayElement(Object.values(BodyType)),
      transmission: faker.helpers.arrayElement(Object.values(Transmission)),
      fuelType: faker.helpers.arrayElement(Object.values(FuelType)),
      color: faker.helpers.arrayElement(Object.values(Color)),
      status: faker.helpers.arrayElement(Object.values(ClassifiedStatus)),
    });
  }
  const result = await prisma.classified.createMany({
    data: classifiedsData,
    skipDuplicates: true,
  });
  console.log(`Classifieds seeded of ${result.count} classifieds 🌱`);
};
