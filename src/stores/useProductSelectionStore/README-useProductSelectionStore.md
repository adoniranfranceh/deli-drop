# 📁 useProductSelectionStore - Gerenciamento de Seleção de Produto

Este diretório contém a lógica central para o gerenciamento de seleção de produtos, incluindo seleção de modificadores, quantidades e validação. A store é composta por diversos arquivos modulares, organizados de acordo com suas responsabilidades.

---

## 📄 Arquivos e suas responsabilidades

| Arquivo | Descrição |
|--------|-----------|
| **`index.js`** | Define a store principal `useProductSelectionStore`, responsável por armazenar e controlar o estado da seleção de produtos (quantidade, modificadores, comentários, etc). |
| **`updateModifierSelection.js`** | Contém a lógica isolada para atualizar um grupo de modificadores dentro do estado da store. |
| **`resetModifiers.js`** | Função responsável por resetar os modificadores com base nos grupos passados, criando a estrutura inicial. |
| **`modifiersUtils.js`** | Funções utilitárias relacionadas a modificadores, como `countSelected` e `normalizeSelectedItems`. |
| **`computePlainSelectedModifiers.js`** | Computed extraído para gerar uma versão simplificada dos modificadores selecionados, útil para envio ao backend ou exibição. |
| **`quantityHandlersFactory.js`** | Fábrica que recebe dependências da store e retorna funções `incrementQuantity` e `decrementQuantity`. Ajuda a manter a store pequena. |
| **`quantityUtils/`** | Pasta com lógica auxiliar para manipulação de quantidade. Usada pela `quantityHandlersFactory`. |
| → `quantityUtils/helpers.js` | Funções auxiliares como `findModifierGroupById`, `extractQuantitiesFromGroup`. |
| → `quantityUtils/index.js` | (Opcional) Ponto de reexportação de utilitários de quantidade. |

---

## Convenções

- A store usa o `defineStore` do Pinia com Composition API.
- As funções foram extraídas em arquivos externos para manter `index.js` dentro do limite de linhas e facilitar testes unitários.
- Toda mutação de modificadores deve passar por `updateModifierSelection`.

---

## Boas práticas

- Evite modificar diretamente `selectedModifiers` fora das abstrações.
- Toda lógica de quantidade deve usar os handlers de `quantityHandlersFactory`.
- Novas computações devem ser extraídas em arquivos próprios quando crescerem demais.
