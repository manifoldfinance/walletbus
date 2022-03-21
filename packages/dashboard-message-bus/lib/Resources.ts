import { Subject } from 'rxjs';

export default function createResources() {
  const resourceSetOnObjSub = new Subject<{ prop: string, value: unknown }>();

  const resources = new Proxy({}, {
    set(target: { [key: string]: unknown }, prop: string, value: unknown) {
      target[prop] = value;
      resourceSetOnObjSub.next({ prop, value });
      return true;
    }
  });

  const subscribableResources: Record<string, (() => Promise<unknown>) | undefined> = {};

  const resourceSetSub = new Subject<{ resource: string, data: unknown }>();

  const api = {
    subscribeToResource: async (resource: string) => {
      let data;
      const resourceGetter = subscribableResources[resource];
      if (resourceGetter) {
        data = await resourceGetter();
      }
      if (data !== undefined) {
        resources[resource] = data;
      } else {
        if (resources[resource] !== undefined) {
          resources[resource] = resources[resource];
        }
      }
    },
    setResource: (msg: { resource: string, data: unknown }) => {
      resources[msg.resource] = msg.data;
      resourceSetSub.next(msg);
    }
  };

  return [resources, api, resourceSetSub.asObservable(), subscribableResources, resourceSetOnObjSub.asObservable()] as const;
}

export type Resources = ReturnType<typeof createResources>[0];
export type ResourceSetObservable = ReturnType<typeof createResources>[2];
export type SubscribableResources = ReturnType<typeof createResources>[3];
export type ResourceSetOnObj = ReturnType<typeof createResources>[4];
