


# Project Architecure
Example structure (exact files may differ)

```sh
src/
├── main.ts                         # Bootstrap application
├── index.html
├── styles.css                      # Global styles, tokens, layers
│
└── app/
    ├── app.ts                      # Root component
    ├── app.config.ts               # Global providers
    ├── app.routes.ts               # Root routing, lazy features
    │
    ├── core/                       # Application-wide infrastructure
    │   ├── auth/
    │   │   ├── auth.service.ts
    │   │   ├── auth.guard.ts
    │   │   └── auth.interceptor.ts
    │   ├── http/
    │   │   ├── api.config.ts
    │   │   ├── error.interceptor.ts
    │   │   └── retry.interceptor.ts
    │   ├── layout/
    │   │   ├── app-shell.ts
    │   │   ├── sidebar.ts
    │   │   └── topbar.ts
    │   └── config/
    │       └── app.tokens.ts
    │
    ├── features/                   # Business capabilities
    │   │
    │   ├── deals/                  # Example feature name
    │   │   ├── deals.routes.ts     # Feature routes + providers (always present + default export)
    │   │   ├── index.ts            # Public feature API (always present)
    │   │   │
    │   │   ├── pages/              # Routable, compose UI + state
    │   │   │   ├── deals-list/deals-list.page.ts
    │   │   │   ├── deal-detail/deal-detail.page.ts
    │   │   │   └── deal-edit/deal-edit.page.ts
    │   │   │
    │   │   ├── ui/                 # Feature-specific presentation
    │   │   │   ├── deal-card/deal-card.ts
    │   │   │   ├── deal-form/deal-form.ts
    │   │   │   ├── deal-status/deal-status.ts
    │   │   │   └── deal-picker/deal-picker.ts
    │   │   │
    │   │   ├── data/               # Data access + state
    │   │   │   ├── deals.api.ts
    │   │   │   ├── deals.store.ts
    │   │   │   └── deals.mapper.ts
    │   │   │
    │   │   └── model/              # Domain contracts + logic
    │   │       ├── deal.ts
    │   │       ├── deal-status.ts  # Optional, enum can go into main file
    │   │       └── deal.rules.ts
    │   │
    │   ├── contacts/
    │   │   ├── contacts.routes.ts
    │   │   ├── index.ts
    │   │   └──  ...
    │   │
    │   └── tasks/
    │       ├── tasks.routes.ts
    │       └──  ...
    │
    └── shared/                     # Reusable, domain-independent
        ├── ui/
        │   ├── card.ts
        │   ├── button.ts
        │   ├── confirm-dialog.ts
        │   ├── empty-state.ts
        │   ├── data-grid.ts
        │   └── ...
        ├── forms/
        │   ├── form-field.ts
        │   └── validation-errors.ts
        ├── directives/
        │   └── autofocus.directive.ts
        ├── pipes/
        │   └── relative-time.pipe.ts
        └── utils/
            ├── pagination.ts
            └── date-format.ts
```

## Responsibilities and boundaries
| Directory | Responsibility | Typical contents |
| --- | --- | --- |
| `core/` | Application-wide infrastructure | Auth, HTTP, app shell, configuration |
| `features/` | Business capabilities | Deals, contacts, tasks |
| `features/*/pages/` | Route entry points and orchestration | List, detail, edit pages |
| `features/*/ui/` | Feature-specific UI | Cards, forms, pickers, widgets |
| `features/*/data/` | Data fetching and state management | API clients, stores, mappers |
| `features/*/model/` | Domain types and business rules | Interfaces, enums, validation |
| `shared/` | Domain-independent reusable code | UI primitives, directives, utilities |

## Dependencies
App dependencies direction

- app → shared
- core → shared
- feature → shared

- feature → core/index (InjectionToken/abstract class/@Service)
- feature → feature/index.ts (barell)

- app.routes → feature/feature.routes.ts (default)

## Within a feature, typical dependencies are:
- pages → ui, data, model
- ui → model (and feature-local state when justified)
- data → model
- model → preferably pure TypeScript, no Angular dependencies