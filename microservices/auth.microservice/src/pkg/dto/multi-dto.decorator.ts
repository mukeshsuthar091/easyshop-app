import 'reflect-metadata';

const ALIAS_NAME = 'md';
const TYPE_FIELD_KEY = "TYPE_FIELD";

interface MD_TYPE_FIELD {
  value: string;
  propertyKey: string;
}

function TypeField(type: string): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(ALIAS_NAME, { value: type, propertyKey }, target, TYPE_FIELD_KEY);
  };
}

function getTypeFieldValue(target: any): MD_TYPE_FIELD {
  return Reflect.getMetadata(ALIAS_NAME, target, TYPE_FIELD_KEY);
}

export const md = {
  TypeField,
  getTypeFieldValue,
};
