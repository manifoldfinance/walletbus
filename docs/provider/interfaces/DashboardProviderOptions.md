[@securerpc/local-provider](../README.md) / [Exports](../modules.md) /
DashboardProviderOptions

# Interface: DashboardProviderOptions

## Table of contents

### Properties

- [autoOpen](DashboardProviderOptions.md#autoopen)
- [dashboardHost](DashboardProviderOptions.md#dashboardhost)
- [dashboardPort](DashboardProviderOptions.md#dashboardport)
- [keepAlive](DashboardProviderOptions.md#keepalive)
- [timeoutSeconds](DashboardProviderOptions.md#timeoutseconds)
- [verbose](DashboardProviderOptions.md#verbose)

## Properties

### autoOpen

• `Optional` **autoOpen**: `boolean`

Boolean indicating whether the dashboard should automatically get opened in the
default browser (default: true)

#### Defined in

[DashboardProvider.ts:39](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L39)

---

### dashboardHost

• `Optional` **dashboardHost**: `string`

Host of the Dashboard (default: localhost)

#### Defined in

[DashboardProvider.ts:24](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L24)

---

### dashboardPort

• `Optional` **dashboardPort**: `number`

Port of the Dashboard (default: 24012)

#### Defined in

[DashboardProvider.ts:27](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L27)

---

### keepAlive

• `Optional` **keepAlive**: `boolean`

Boolean indicating whether the connection to the dashboard is kept alive between
requests (default: false)

#### Defined in

[DashboardProvider.ts:33](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L33)

---

### timeoutSeconds

• `Optional` **timeoutSeconds**: `number`

Number of seconds before a dashboard-provider request times out (default: 120)

#### Defined in

[DashboardProvider.ts:30](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L30)

---

### verbose

• `Optional` **verbose**: `boolean`

Boolean indicating whether debug output should be logged (default: false)

#### Defined in

[DashboardProvider.ts:36](https://github.com/sambacha/schoolbus/blob/79108f9/packages/dashboard-provider/lib/DashboardProvider.ts#L36)
