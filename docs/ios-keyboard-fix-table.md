# Сводная таблица решений для каждого компонента

Для лучшего понимания, какие решения применяются к каким компонентам и в какие моменты, ниже приведена сводная таблица:

## Структура экрана

Типичная структура экрана в нашем приложении включает следующие ключевые элементы:

1. **app-container** - основной контейнер всего приложения
2. **tool-title** - заголовок вверху экрана
3. **content-area** - основная область контента (содержит карусель)
4. **horizontal-carousel** - карусель с изображениями
5. **prompt-form** - форма ввода внизу экрана
6. **prompt-textarea** - текстовое поле для ввода
7. **tab-button, html-slider** - кнопки и элементы управления в форме

## Таблица применяемых решений по компонентам

| Компонент | CSS-решения | JavaScript-решения | Когда применяется |
|-----------|-------------|-------------------|-------------------|
| **html, body, #root** | `position: fixed`, `width/height: 100%`, `overflow: hidden` | - | Базовые настройки для предотвращения сдвига контента |
| **app-container** | `position: fixed`, `transform: translateZ(0)` | - | Базовые настройки для предотвращения сдвига контента |
| **content-area** | `transition: height 0.1s, padding-bottom 0.1s`, `will-change: height, padding-bottom` | Управление через классы при открытии/закрытии клавиатуры | При изменении размера из-за клавиатуры |
| **horizontal-carousel** | `transition: height 0.1s`, `will-change: height` | Управление через классы при открытии/закрытии клавиатуры | При изменении размера из-за клавиатуры |
| **prompt-form** | `position: fixed`, `bottom: 0`, `transform: translate3d(0,0,0)`, `z-index: 10`, `will-change: transform`, `transition-duration: 0.1s` | `fixPositioning()` при тапах и фокусе | При открытии/закрытии клавиатуры |
| **prompt-textarea** | `z-index: 20`, `will-change: transform`, `user-select: text` | Обработчики событий focus/blur | При получении/потере фокуса |
| **tab-button, html-slider** | `z-index: 20`, `pointer-events: auto` | - | Для правильного взаимодействия с элементами управления |

## Таблица решений по процессам

| Процесс | Компоненты | Применяемые решения |
|---------|------------|---------------------|
| **Начальная загрузка** | Все | CSS-фиксация позиций через `position: fixed`, JS-функция `preventFlicker()`, добавление класса `ios-device` |
| **Открытие клавиатуры** | content-area, horizontal-carousel | Уменьшение высоты с анимацией 0.1s через класс `keyboard-open` |
| **Открытие клавиатуры** | prompt-form | Смещение вверх с помощью `fixPositioning()` и класса `keyboard-open` |
| **Закрытие клавиатуры** | content-area, horizontal-carousel | Восстановление высоты с анимацией 0.1s после удаления класса `keyboard-open` |
| **Закрытие клавиатуры** | prompt-form | Возврат в исходное положение через `fixPositioning()` и удаление класса `keyboard-open` |
| **Тапы по элементам** | Все интерактивные элементы | Применение `fixPositioning()` при событии touchstart для перерасчета позиций |

## Последовательность оптимизаций при загрузке

1. Определение устройства iOS
2. Добавление класса `ios-device` к body
3. Вызов функции `preventFlicker()` для подготовки элементов
4. Вызов `fixPositioning()` для принудительного перерасчета позиций
5. Настройка обработчиков событий для текстовой области

## Последовательность при работе с клавиатурой

1. При получении фокуса input/textarea:
   - Добавление класса `keyboard-open` к body
   - Вызов `fixPositioning()` с задержкой 300ms

2. При потере фокуса input/textarea:
   - Удаление класса `keyboard-open` с body
   - Вызов `fixPositioning()` с задержкой 300ms

Эта таблица поможет четко понять, какие именно решения нужно применить к компонентам вашего интерфейса с аналогичной структурой экрана.
