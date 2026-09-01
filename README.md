<div align="center">

  # Aegis - роутер для безопасного интернета

  ![Status](https://img.shields.io/badge/status-в%20эксплуатации-brightgreen)
  ![Type](https://img.shields.io/badge/type-hardware%20%2B%20VPN%20service-blue)
  ![License](https://img.shields.io/badge/code-closed%20source-lightgrey)

  🔗 **[Открыть сайт → Aegis](https://ceo-alex-schultz.github.io/aegis-core/index.html)**

</div>

---

## О проекте

**Aegis** - роутеры с предустановленной прошивкой для обхода блокировок и собственная серверная VPN-инфраструктура. Идея простая: не заставлять пользователя разбираться в протоколах, конфигах и отдельном VPN-приложении на каждом устройстве - обход санкций зашивается один раз на уровне роутера, и дальше просто работает.

Продукт существует в двух форматах на одной инфраструктуре:

- **Железо** - физический роутер на OpenWrt (Aegis Mini / Pro / Max) с уже настроенной прошивкой
- **Подписка** - доступ к серверной инфраструктуре для любого устройства без покупки роутера

## Что реализовано (сайт)

- 🖥️ Лендинг с живым статусом "ТУННЕЛЬ АКТИВЕН" и анимированными счётчиками (0 логов, 4 протокола в резерве, 24/7 мониторинг)
- 🔀 Блок протоколов — карточки VLESS+Reality, Hysteria2, Trojan, WireGuard с описанием роли каждого в автоматическом failover
- 🛒 Каталог товаров с раскрывающимися карточками: три модели роутера + тарифы подписки с переключением периода (1/3/6/12 месяцев) и скидками
- 📖 Страница "О нас" с манифестом и описанием команды
- 📱 Полностью адаптивная вёрстка
- ⚙️ Задеплоено на GitHub Pages

## Серверная инфраструктура

- 🌍 Взяты и настроены сервера в Риге, Нидерландах и Финляндии под панелями **Remnawave** и **3x-ui**
- 🔐 Настроены протоколы **VLESS+Reality, Hysteria2, Trojan**
- 🚑 Разобрана цепочка проблем при миграции на новый сервер: падения DNS, переполнение диска, MySQL crash-loop

## Стек

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?logo=github&logoColor=white)
![OpenWrt](https://img.shields.io/badge/OpenWrt-00B5E2?logo=openwrt&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
</br>
![VLESS+Reality](https://img.shields.io/badge/VLESS%2BReality-6C63FF)
![Hysteria2](https://img.shields.io/badge/Hysteria2-FF6B6B)
![Trojan](https://img.shields.io/badge/Trojan-333333)
![WireGuard](https://img.shields.io/badge/WireGuard-88171A?logo=wireguard&logoColor=white)
![Remnawave](https://img.shields.io/badge/Remnawave-1A1A2E)
![3x--ui](https://img.shields.io/badge/3x--ui-2E2E2E)

## Скриншоты

_Скоро здесь появятся скрины интерфейса._

## Контакты

📧 hello@core-aegis.online
