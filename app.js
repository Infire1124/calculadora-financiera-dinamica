// --- ELEMENTOS DE INTERFAZ ---
const selectIdiomaApp = document.getElementById('idiomaApp');
const selectMoneda = document.getElementById('moneda');
const labelsMoneda = document.querySelectorAll('.label-moneda');

// Inputs Formulario
const inputInvInicial = document.getElementById('invInicial');
const sliderFase1 = document.getElementById('fase1');
const sliderFase2 = document.getElementById('fase2');
const sliderFase3 = document.getElementById('fase3');
const selectFrecuenciaExtra = document.getElementById('frecuenciaExtra');
const inputMontoExtra = document.getElementById('montoExtra');
const inputAnos = document.getElementById('anos');
const inputInteres = document.getElementById('interes');
const inputInflacion = document.getElementById('inflacion');

// Textos Interactivos e Interfaz
const txtValFase1 = document.getElementById('valFase1');
const txtValFase2 = document.getElementById('valFase2');
const txtValFase3 = document.getElementById('valFase3');
const resTotal = document.getElementById('resTotal');
const resRetiro = document.getElementById('resRetiro');
const btnCalcular = document.getElementById('btnCalcular');
const btnReiniciar = document.getElementById('btnReiniciar');

// Componentes del Mensaje Informativo
const contenedorMensajes = document.getElementById('contenedorMensajes');
const resAnios = document.getElementById('resAnios');
const resMonto = document.getElementById('resMonto');

let grafico = null;

let datosParaExportar = []; 
// --- DICCIONARIO INTERNACIONAL AMPLIADO (CORREGIDO) ---
const idiomas = {
    es: {
        titulo: "Simulador de Inversión Global | Calculadora Patrimonial", subtitulo: "Plataforma internacional para proyecciones financieras de alto rendimiento",
        configPlan: "Configuración del Plan Global", idiomaApp: "Idioma de Interfaz", monedaBase: "Moneda de Inversión", invInicial: "Inversión Inicial",
        aportesFases: "Aportes Mensuales por Fases", fase1: "Fase 1 (Años 1-5):", fase2: "Fase 2 (Años 6-13):", fase3: "Fase 3 (Años 14-30):",
        aportesExtra: "Aportes Adicionales / Extra", frecuencia: "Frecuencia", montoExtra: "Monto del Aporte", anosSimular: "Años a simular",
        interesAnual: "Interés Anual (%)", inflacionAnual: "Inflación (%)", patrimonioFuturo: "Patrimonio Estimado (Futuro)", retiroSeguro: "Retiro Mensual Seguro (4%)",
        proyeccionGraf: "Proyección Internacional del Capital", btnCalcular: "Calcular Plan", btnReiniciar: "Resetear Valores",
        frecuencias: ["Ninguna", "Cada Mes", "Cada 6 Meses", "Cada 12 Meses (Anual)"], 
        lineas: ["Patrimonio Total", "Poder Adquisitivo Real", "Depósitos Totales"],
        msgTitulo: "Métricas Estadísticas del Modelo", msgEn: "Bajo este esquema de simulación a", msgAniosTendras: "años, tu capital proyectado asciende a",
        msgDesc1: "El modelado matemático superior traza la evolución estimada de sus fondos según los parámetros indexados de capitalización compuesta y volatilidad controlada.",
        msgDesc2: "Nota analítica: Modificaciones marginales en las variables de rentabilidad o inflación generan impactos exponenciales sobre el patrimonio de cierre. Evalúe múltiples escenarios de estrés.",
        footer: "Calculadora Patrimonial Global Inteligente • Soporte Multidivisa Internacional Independiente", dir: "ltr"
    },
    en: {
        titulo: "Global Investment Simulator | Wealth Calculator", subtitulo: "International platform for high-performance financial projections",
        configPlan: "Global Plan Configuration", idiomaApp: "Interface Language", monedaBase: "Investment Currency", invInicial: "Initial Investment",
        aportesFases: "Monthly Phase Contributions", fase1: "Phase 1 (Years 1-5):", fase2: "Phase 2 (Years 6-13):", fase3: "Phase 3 (Years 14-30):",
        aportesExtra: "Additional / Extra Contributions", frecuencia: "Frequency", montoExtra: "Contribution Amount", anosSimular: "Years to simulate",
        interesAnual: "Annual Interest Rate (%)", inflacionAnual: "Inflation (%)", patrimonioFuturo: "Estimated Wealth (Future)", retiroSeguro: "Safe Monthly Withdrawal (4%)",
        proyeccionGraf: "International Capital Projection", btnCalcular: "Run Plan", btnReiniciar: "Reset Parameters",
        frecuencias: ["None", "Every Month", "Every 6 Months", "Every 12 Months (Annual)"], 
        lineas: ["Total Wealth", "Real Purchasing Power", "Total Deposits"],
        msgTitulo: "Model Statistical Analytics", msgEn: "Under this strategic simulation for", msgAniosTendras: "years, your projected balance reaches",
        msgDesc1: "This advanced mathematical modeling tracks the forward-looking trajectory of your investment portfolio, computing compounded growth scales alongside specific interest variables.",
        msgDesc2: "Analytical note: Minor baseline changes in target yields or inflation create exponential variations in terminal wealth. We strongly recommend testing multiple market setups.",
        footer: "Intelligent Global Wealth Calculator • Independent Multi-Currency International Support", dir: "ltr"
    },
    pt: {
        titulo: "Simulador de Investimento Global | Calculadora Patrimonial", subtitulo: "Plataforma internacional para projeções financeiras de alto rendimento",
        // ... (resto de campos igual)
        configPlan: "Configuração do Plano Global", idiomaApp: "Idioma da Interface", monedaBase: "Moeda de Investimento", invInicial: "Investimento Inicial",
        aportesFases: "Contribuições Mensais por Fases", fase1: "Fase 1 (Anos 1-5):", fase2: "Fase 2 (Anos 6-13):", fase3: "Fase 3 (Anos 14-30):",
        aportesExtra: "Aportes Adicionais / Extra", frecuencia: "Frequência", montoExtra: "Valor do Aporte", anosSimular: "Anos a simular",
        interesAnual: "Juros Anuais (%)", inflacionAnual: "Inflação (%)", patrimonioFuturo: "Patrimônio Estimado", retiroSeguro: "Retirada Mensual Segura (4%)",
        proyeccionGraf: "Projeção Internacional de Capital", btnCalcular: "Executar Plano", btnReiniciar: "Limpar Painel",
        frecuencias: ["Nenhuma", "Mensal", "A cada 6 Meses", "A cada 12 Meses (Anual)"], 
        lineas: ["Patrimônio Total", "Poder de Compra Real", "Depósitos Totales"],
        msgTitulo: "Métricas Estatísticas do Modelo", msgEn: "Sob este modelo estratégico estruturado a", msgAniosTendras: "anos, o capital terminal estimado chega a",
        msgDesc1: "O mapeamento algorítmico simula o comportamento dos seus ativos baseado em fluxos futuros descontados sob taxas nominais recorrentes.",
        msgDesc2: "Nota de mercado: Variações residuais no rendimento líquido provocam desvios massivos no longo prazo devido ao efeito exponencial do juro composto.",
        footer: "Calculadora Patrimonial Global Inteligente • Suporte Multimoeda Internacional Independente", dir: "ltr"
    },
    ru: {
        titulo: "Глобальный Симулятор Инвестиций | Калькулятор Капитала", subtitulo: "Международная платформа для высокоэффективного финансового прогнозирования",
        // (Continúa con el mismo formato para ru, ar, hi, zh, zh-tw, ja, ko, uk)
        configPlan: "Конфигурация глобального плана", idiomaApp: "Язык интерфейса", monedaBase: "Валюта инвестиций", invInicial: "Начальные инвестиции",
        aportesFases: "Ежемесячные взносы по фазам", fase1: "Фаза 1 (1-5 лет):", fase2: "Фаза 2 (6-13 лет):", fase3: "Фаза 3 (14-30 лет):",
        aportesExtra: "Дополнительные взносы", frecuencia: "Периодичность", montoExtra: "Сумма взноса", anosSimular: "Срок симуляции (лет)",
        interesAnual: "Годовой доход (%)", inflacionAnual: "Инфляция (%)", patrimonioFuturo: "Ожидаемый капитал (будущий)", retiroSeguro: "Безопасный ежемесячный вывод (4%)",
        proyeccionGraf: "Международная проекция капитала", btnCalcular: "Рассчитать", btnReiniciar: "Сбросить параметры",
        frecuencias: ["Нет", "Каждый месяц", "Каждые 6 месяцев", "Каждые 12 месяцев (Ежегодно)"],
        lineas: ["Общий капитал", "Реальная покупательная способность", "Всего депозитов"],
        msgTitulo: "Статистические метрики модели", msgEn: "В рамках данной стратегической симуляции за", msgAniosTendras: "лет ваш прогнозируемый капитал составит",
        msgDesc1: "Высокоточное математическое моделирование строит расчетную траекторию развития ваших активов с учетом сложных процентов и индексации инфляции.",
        msgDesc2: "Аналитическая справка: Минимальные колебания доходности или инфляции приводят к экспоненциальным изменениям итогового капитала.",
        footer: "Умный Глобальный Калькулятор Капитала • Независимая международная мультивалютная поддержка", dir: "ltr"
    },
    ar: { titulo: "محاكي الاستثمار العالمي | حاسبة الثروة", subtitulo: "منصة دولية للتوقعات المالية عالية الأداء", configPlan: "إعدادات الخطة الشاملة", idiomaApp: "لغة الواجهة", monedaBase: "عملة الاستثمار", invInicial: "الاستثمار الأولي", aportesFases: "المساهمات الشهرية حسب المراحل", fase1: "المرحلة ١ (سنوات ١-٥):", fase2: "المرحلة ٢ (سنوات ٦-١٣):", fase3: "المرحلة ٣ (سنوات ١٤-٣٠):", aportesExtra: "إيداعات إضافية / فرعية", frecuencia: "التكرار", montoExtra: "مبلغ الإيداع", anosSimular: "السنوات المحاكاة", interesAnual: "العائد السنوي (%)", inflacionAnual: "التضخم (%)", patrimonioFuturo: "رأس المال المتوقع (المستقبلي)", retiroSeguro: "السحب الشهري الآمن (٤%)", proyeccionGraf: "العرض الدولي لنمو رأس المال", btnCalcular: "حساب الخطة", btnReiniciar: "إعادة ضبط", frecuencias: ["لا يوجد", "كل شهر", "كل ٦ أشهر", "كل ١٢ شهراً (سنوي)"], lineas: ["إجمالي رأس المال", "القوة الشرائية الحقيقية", "إجمالي الإيداعات"], msgTitulo: "المقاييس الإحصائية للنموذج", msgEn: "تحت هذا المخطط الاستراتيجي للمحاكاة لمدة", msgAniosTendras: "عامًا، يرتفع رأس مالك المقدر إلى", msgDesc1: "ترسم النمذجة الرياضية المتقدمة التطور المتوقع لأموالك بناءً على معايير الفائدة المركبة والتقلبات المحددة.", msgDesc2: "ملاحظة تحليلية: التغييرات الطفيفة في عوائد الاستثمار أو معدلات التضخم تؤدي إلى اختلافات جذرية في رأس المال النهائي بسبب الأثر التراكمي.", footer: "حاسبة الثروة العالمية الذكية • دعم دولي مستقل متعدد العملات", dir: "rtl" },
    hi: { titulo: "वैश्विक निवेश सिम्युलेटर | संपत्ति कैलकुलेटर", subtitulo: "उच्च प्रदर्शन वित्तीय अनुमानों के लिए अंतर्राष्ट्रीय मंच", configPlan: "ग्लोबल प्लान कॉन्फ़िगरेशन", idiomaApp: "इंटरफ़ेस की भाषा", monedaBase: "निवेश की मुद्रा", invInicial: "प्रारंभिक निवेश", aportesFases: "चरणों के अनुसार मासिक योगदान", fase1: "चरण 1 (वर्ष 1-5):", fase2: "चरण 2 (वर्ष 6-13):", fase3: "चरण 3 (वर्ष 14-30):", aportesExtra: "अतिरिक्त / अतिरिक्त योगदान", frecuencia: "आवृत्ति", montoExtra: "योगदान राशि", anosSimular: "सिम्युलेट करने के लिए वर्ष", interesAnual: "वार्षिक ब्याज (%)", inflacionAnual: "मुद्रास्फीति (%)", patrimonioFuturo: "अनुमानित संपत्ति (भविष्य)", retiroSeguro: "सुरक्षित मासिक निकासी (4%)", proyeccionGraf: "अंतर्राष्ट्रीय पूंजी प्रक्षेपण", btnCalcular: "योजना की गणना करें", btnReiniciar: "पैरामीटर रीसेट करें", frecuencias: ["कोई नहीं", "हर महीने", "हर 6 महीने में", "हर 12 महीने में (वार्षिक)"], lineas: ["कुल संपत्ति", "वास्तविक क्रय शक्ति", "कुल जमा"], msgTitulo: "MODEL STATISTICAL ANALYTICS", msgEn: "के लिए इस रणनीतिक सिमुलेशन के तहत", msgAniosTendras: "वर्षों में, आपकी अनुमानित पूंजी तक पहुँच जाएगी", msgDesc1: "उन्नत गणितीय मॉडलिंग चक्रवृद्धि ब्याज और नियंत्रित अस्थिरता सूचकांकों के आधार पर आपके फंड के अनुमानित विकास को ट्रैक करता है।", msgDesc2: "विश्लेषणात्मक नोट: रिटर्न या मुद्रास्फीति में मामूली बदलाव अंतिम संपत्ति पर घातीय प्रभाव डालते हैं। विभिन्न परिदृश्यों का परीक्षण करें।", footer: "इंटेलिजेंट ग्लोबल वेल्थ कैलकुलेटर • स्वतंत्र मल्टी-करेंसी अंतर्राष्ट्रीय सहायता", dir: "ltr" },
    zh: { titulo: "全球投资模拟器 | 全球资产配置计算器", subtitulo: "用于高回报财务预测的国际化平台", configPlan: "全球方案配置", idiomaApp: "界面语言", monedaBase: "投资结算货币", invInicial: "初始资产投入", aportesFases: "分阶段每月定期投入", fase1: "第一阶段 (1-5年):", fase2: "第二阶段 (6-13年):", fase3: "第三阶段 (14-30年):", aportesExtra: "额外/追加单笔投入", frecuencia: "追加频率", montoExtra: "追加金额", anosSimular: "模拟持有时长 (年)", interesAnual: "预期年化收益 (%)", inflacionAnual: "通货膨胀率 (%)", patrimonioFuturo: "期末预估资产总值", retiroSeguro: "每月安全提取金 (4% 规则)", proyeccionGraf: "跨国资本增长曲线预测", btnCalcular: "执行测算", btnReiniciar: "重置所有参数", frecuencias: ["无追加", "每月追加", "每半年追加", "每12个月 (按年追加)"], lineas: ["资产总市值", "剔除通胀实际购买力", "累计本金投入"], msgTitulo: "数据模型数理统计摘要", msgEn: "在当前复利策略模型下，持有", msgAniosTendras: "年后，您的全球期末总资产预计将达到", msgDesc1: "该高级金融数学模型基于复利累积效应以及通胀对冲变动，精确绘制出资产生命周期的远期财富演变轨迹。", msgDesc2: "数据风控提示：基准回报率 or 通胀率的微小偏差，均会在长周期内产生巨大的指数级分化误差。建议开展多组压力测试。", footer: "全球智能资产管理系统 • 独立多币种海外结算技术支持", dir: "ltr" },
    "zh-tw": { titulo: "全球投資模擬器 | 全球資產配置計算器", subtitulo: "用於高回報財務預測的國際化平台", configPlan: "全球方案配置", idiomaApp: "介面語言", monedaBase: "投資結算貨幣", invInicial: "初始資產投入", aportesFases: "分階段每月定期投入", fase1: "第一階段 (1-5年):", fase2: "第二階段 (6-13年):", fase3: "第三階段 (14-30年):", aportesExtra: "額外/追加單筆投入", frecuencia: "追加頻率", montoExtra: "追加金額", anosSimular: "模擬持小時長 (年)", interesAnual: "預期年化收益 (%)", inflacionAnual: "通貨膨脹率 (%)", patrimonioFuturo: "期末預估資產總值", retiroSeguro: "每月安全提取金 (4% 規則)", proyeccionGraf: "跨國資本增長曲線預測", btnCalcular: "執行測算", btnReiniciar: "重置所有參數", frecuencias: ["無追加", "每月追加", "每半年追加", "每12個月 (按年追加)"], lineas: ["資產總市值", "剔除通脹實際購買力", "累計本金投入"], msgTitulo: "數據模型數理統計摘要", msgEn: "在當前複利策略模型下，持有", msgAniosTendras: "年後，您的全球期末總資產預計將達到", msgDesc1: "該高級金融數學模型基於複利累積效應以及通脹對衝變動，精確繪製出資產生命週期的遠期財富演變軌跡。", msgDesc2: "數據風控提示：基準回報率或通貨膨脹率的微小偏差，均會在長週期內產生巨大的指數級分化誤差。建議開展多組壓力測試。", footer: "全球智能資產管理系統 • 獨立多幣種海外結算技術支援", dir: "ltr" },
    ja: { titulo: "グローバル投資シミュレーター | 資産計算機", subtitulo: "高パフォーマンスの財務予測のための国際プラットフォーム", configPlan: "シミュレーション設計", idiomaApp: "システム言語", monedaBase: "投資決済通貨", invInicial: "初期投資額", aportesFases: "フェーズ別積立月額", fase1: "フェーズ1 (1-5年):", fase2: "フェーズ2 (6-13年):", fase3: "フェーズ3 (14-30年):", aportesExtra: "臨時/追加投資オプション", frecuencia: "追加頻度", montoExtra: "追加投資額", anosSimular: "運用シミュレーション期間 (年)", interesAnual: "想定年利 (%)", inflacionAnual: "インフレ率 (%)", patrimonioFuturo: "将来の推定総資産額", retiroSeguro: "毎月の安全な取り崩し額 (4%)", proyeccionGraf: "国際資本成長予測曲線", btnCalcular: "試算を実行", btnReiniciar: "数値をリセット", frecuencias: ["なし", "毎月", "6ヶ月ごと", "12ヶ月ごと (毎年)"], lineas: ["総資産総額", "インフレ調整後実質購買力", "累計元本入金額"], msgTitulo: "数理モデル統計アナリティクス", msgEn: "この長期運用シミュレーションにおいて、期間", msgAniosTendras: "年での期末想定総資産は、次の金額に達します", msgDesc1: "本高度数理モデリングは、複利効果および物価変動調整を考慮し、お客様のポートフォリオの将来的な軌道を精密にプロットします。", msgDesc2: "分析上の注意：利回りやインフレ率のわずかな変動が、期間末の資産総額に指数関数的な格差をもたらします。複数の市場環境で検証してください。", footer: "インテリジェント・グローバル資産計算システム • 独立系マルチ通貨インターナショナルサポート", dir: "ltr" },
    ko: { titulo: "글로벌 투자 시뮬레이터 | 자산 계산기", subtitulo: "고성능 재무 예측을 위한 국제 플랫폼", configPlan: "글로벌 시뮬레이션 설정", idiomaApp: "시스템 언어", monedaBase: "투자 결제 통화", invInicial: "초기 투자 자본", aportesFases: "단계별 월 정기 납입액", fase1: "1단계 (1-5년):", fase2: "2단계 (6-13년):", fase3: "3단계 (14-30년):", aportesExtra: "추가 / 임시 추가 납입", frecuencia: "납입 주기", montoExtra: "추가 납입 금액", anosSimular: "시뮬레이션 기간 (년)", interesAnual: "기대 연수익률 (%)", inflacionAnual: "물가상승률 (%)", patrimonioFuturo: "미래 추정 자산 총액", retiroSeguro: "안전 월 은퇴 자금 (4% 룰)", proyeccionGraf: "국제 자본 성장 예측 곡선", btnCalcular: "분석 실행", btnReiniciar: "매개변수 초기화", frecuencias: ["없음", "매월", "6개월마다", "12개월마다 (매년)"], lineas: ["추정 총자산", "실질 구매력 평가지수", "누적 원금 총액"], msgTitulo: "데이터 모델 통계 요약", msgEn: "본 복리 시뮬레이션 모델에 의거하여,", msgAniosTendras: "년 보유 시 귀하의 기대 만기 자산은 다음과 같습니다", msgDesc1: "이 고급 금융 수학 모델링은 복리 연산 구조 및 제어된 변동성 지표에 따라 자산의 장기 성장 궤적을 도출합니다.", msgDesc2: "분석적 각주: 수익률이나 물가 지수의 미세한 변화는 장기 실행 시 최종 만기 자산에 기하급수적인 격차를 발생시킵니다.", footer: "인텔리전트 글로벌 자산 시뮬레이터 • 독립형 다중 통화 지원 시스템", dir: "ltr" },
    uk: { titulo: "Глобальний Симулятор Інвестицій | Калькулятор Капіталу", subtitulo: "Міжнародна платформа для високоефективного фінансового прогнозування", configPlan: "Конфігурація глобального плана", idiomaApp: "Мова інтерфейсу", monedaBase: "Валюта інвестицій", invInicial: "Початкові інвестиції", aportesFases: "Щомісячні внески по фазах", fase1: "Фаза 1 (1-5 років):", fase2: "Фаза 2 (6-13 років):", fase3: "Фаза 3 (14-30 років):", aportesExtra: "Додаткові внески", frecuencia: "Періодичність", montoExtra: "Сумма внеску", anosSimular: "Років симуляції", interesAnual: "Річний дохід (%)", inflacionAnual: "Інфляція (%)", patrimonioFuturo: "Очікуваний капітал (майбутній)", retiroSeguro: "Безпечне щомісячне виведення (4%)", proyeccionGraf: "Міжнародна проекція капіталу", btnCalcular: "Розрахувати план", btnReiniciar: "Скинути параметри", frecuencias: ["Немає", "Щомісяця", "Кожні 6 місяців", "Кожні 12 місяців (Щорічно)"], lineas: ["Загальний капітал", "Реальна купівельна спроможність", "Всього депозитів"], msgTitulo: "Статистичні метрики модели", msgEn: "В рамках цієї стратегічної симуляції за", msgAniosTendras: "років ваш прогнозований капітал досягне", msgDesc1: "Передове математичне моделювання відображає розрахункову траєкторію розвитку ваших інвестицій з урахуванням складних процентів та індексації інфляції.", msgDesc2: "Аналітична довідка: Мінімальні зміни базової прибутковості або інфляції створюють експоненціальні коливання кінцевого капіталу.", footer: "Розумний Глобальний Калькулятор Капіталу • Незалежна міжнародна мультивалютна підтримка", dir: "ltr" }
};

const formatosMoneda = {
    USD: { locale: 'en-US' }, EUR: { locale: 'de-DE' }, GBP: { locale: 'en-GB' },
    JPY: { locale: 'ja-JP' }, CNY: { locale: 'zh-CN' }, INR: { locale: 'en-IN' },
    RUB: { locale: 'ru-RU' }, UAH: { locale: 'uk-UA' }, BRL: { locale: 'pt-BR' },
    KRW: { locale: 'ko-KR' }, COP: { locale: 'es-CO' }
};

function formatearDinero(monto, codigoMoneda) {
    const config = formatosMoneda[codigoMoneda] || { locale: 'en-US' };
    return new Intl.NumberFormat(config.locale, {
        style: 'currency', currency: codigoMoneda, maximumFractionDigits: 0
    }).format(monto);
}

// --- TRADUCCIÓN DINÁMICA ---
function localizarInterfaz() {
    const idiomaCod = selectIdiomaApp.value;
    const trad = idiomas[idiomaCod] || idiomas.es;
    const moneda = selectMoneda.value;

    // Configurar dirección del documento (Soporte RTL para Árabe)
    document.body.dir = trad.dir || "ltr";
    
    // Cambiar alineación de inputs e iconos si es RTL
    const inputsMoneda = [document.getElementById('badge-moneda-inicial'), document.getElementById('badge-moneda-extra')];
    if(trad.dir === "rtl") {
        document.getElementById('panel-control').classList.add('text-right');
        document.getElementById('panel-resultados').classList.add('text-right');
        inputsMoneda[0].className = "absolute right-3 top-2.5 text-slate-500 font-bold label-moneda";
        inputsMoneda[1].className = "absolute right-2 top-2 text-xs text-slate-500 font-bold label-moneda";
        inputInvInicial.className = "w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 pr-16 pl-4 text-white font-bold text-lg text-right focus:ring-2 focus:ring-emerald-500 focus:outline-none";
        inputMontoExtra.className = "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 pr-12 pl-2 text-white font-bold text-sm text-right focus:ring-2 focus:ring-emerald-500 focus:outline-none";
    } else {
        document.getElementById('panel-control').classList.remove('text-right');
        document.getElementById('panel-resultados').classList.remove('text-right');
        inputsMoneda[0].className = "absolute left-3 top-2.5 text-slate-500 font-bold label-moneda";
        inputsMoneda[1].className = "absolute left-2 top-2 text-xs text-slate-500 font-bold label-moneda";
        inputInvInicial.className = "w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 pl-16 pr-4 text-white font-bold text-lg text-left focus:ring-2 focus:ring-emerald-500 focus:outline-none";
        inputMontoExtra.className = "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 pl-12 pr-2 text-white font-bold text-sm text-left focus:ring-2 focus:ring-emerald-500 focus:outline-none";
    }

    // Traducir Textos Base
    document.getElementById('lbl-titulo').textContent = trad.titulo;
    document.getElementById('lbl-subtitulo').textContent = trad.subtitulo;
    document.getElementById('lbl-config-plan').innerHTML = `<span>🛠️</span> ${trad.configPlan}`;
    document.getElementById('lbl-idioma-app').textContent = trad.idiomaApp;
    document.getElementById('lbl-moneda-base').textContent = trad.monedaBase;
    document.getElementById('lbl-inv-inicial').textContent = trad.invInicial;
    document.getElementById('lbl-aportes-fases').textContent = trad.aportesFases;
    document.getElementById('lbl-fase1').textContent = trad.fase1;
    document.getElementById('lbl-fase2').textContent = trad.fase2;
    document.getElementById('lbl-fase3').textContent = trad.fase3;
    document.getElementById('lbl-aportes-extra').textContent = trad.aportesExtra;
    document.getElementById('lbl-frecuencia').textContent = trad.frecuencia;
    document.getElementById('lbl-monto-extra').textContent = trad.montoExtra;
    document.getElementById('lbl-anos-simular').textContent = trad.anosSimular;
    document.getElementById('lbl-interes-anual').textContent = trad.interesAnual;
    document.getElementById('lbl-inflacion-anual').textContent = trad.inflacionAnual;
    document.getElementById('lbl-patrimonio-futuro').textContent = trad.patrimonioFuturo;
    document.getElementById('lbl-retiro-seguro').textContent = trad.retiroSeguro;
    document.getElementById('lbl-proyeccion-graf').textContent = trad.proyeccionGraf;
    btnCalcular.textContent = trad.btnCalcular;
    btnReiniciar.textContent = trad.btnReiniciar;
    document.getElementById('lbl-footer').textContent = trad.footer;

    // Mensaje Informativo Técnico Rediseñado
    document.getElementById('msgTituloResultado').textContent = trad.msgTitulo;
    document.getElementById('msgEn').textContent = trad.msgEn;
    document.getElementById('msgAniosTendras').textContent = trad.msgAniosTendras;
    document.getElementById('msgDescripcion1').textContent = trad.msgDesc1;
    document.getElementById('msgDescripcion2').textContent = trad.msgDesc2;

    // Desplegable Frecuencias sin pérdida de visibilidad
    const freqActual = selectFrecuenciaExtra.value || "999";
    selectFrecuenciaExtra.innerHTML = `
        <option value="999" class="bg-slate-900 text-white" ${freqActual==="999"?'selected':''}>${trad.frecuencias[0]}</option>
        <option value="1" class="bg-slate-900 text-white" ${freqActual==="1"?'selected':''}>${trad.frecuencias[1]}</option>
        <option value="6" class="bg-slate-900 text-white" ${freqActual==="6"?'selected':''}>${trad.frecuencias[2]}</option>
        <option value="12" class="bg-slate-900 text-white" ${freqActual==="12"?'selected':''}>${trad.frecuencias[3]}</option>
    `;

    labelsMoneda.forEach(label => label.textContent = moneda);
    txtValFase1.textContent = formatearDinero(sliderFase1.value, moneda);
    txtValFase2.textContent = formatearDinero(sliderFase2.value, moneda);
    txtValFase3.textContent = formatearDinero(sliderFase3.value, moneda);
}

// --- PROCESADOR DE INVERSIÓN ---
function calcularProyeccion() {
    datosParaExportar = [];
    const trad = idiomas[selectIdiomaApp.value] || idiomas.es;
    const moneda = selectMoneda.value;

    const inversionInicial = parseFloat(inputInvInicial.value) || 0;
    const anos = parseInt(inputAnos.value) || 0;
    const tasaAnual = (parseFloat(inputInteres.value) || 0) / 100;
    const tasaMensual = Math.pow(1 + tasaAnual, 1 / 12) - 1;
    const inflacionAnual = (parseFloat(inputInflacion.value) || 0) / 100;

    const aporteFase1 = parseFloat(sliderFase1.value);
    const aporteFase2 = parseFloat(sliderFase2.value);
    const aporteFase3 = parseFloat(sliderFase3.value);
    const frecuenciaExtra = parseInt(selectFrecuenciaExtra.value) || 999;
    const montoExtra = parseFloat(inputMontoExtra.value) || 0;

    let saldoPatrimonio = inversionInicial;
    let totalDepositos = inversionInicial;

    const etiquetasGrafico = ['0'];
    const datosPatrimonio = [saldoPatrimonio];
    const datosDepositos = [totalDepositos];
    const datosAjustados = [saldoPatrimonio];

    for (let mes = 1; mes <= anos * 12; mes++) {
        let anoActual = Math.ceil(mes / 12);
        let aporteMensual = (anoActual <= 5) ? aporteFase1 : (anoActual <= 13) ? aporteFase2 : aporteFase3;

        saldoPatrimonio += aporteMensual;
        totalDepositos += aporteMensual;

        if (mes % frecuenciaExtra === 0) {
            saldoPatrimonio += montoExtra;
            totalDepositos += montoExtra;
        }

        saldoPatrimonio *= (1 + tasaMensual);

        if (mes % 12 === 0) {
            datosPatrimonio.push(Math.round(saldoPatrimonio));
            datosDepositos.push(Math.round(totalDepositos));
            datosAjustados.push(Math.round(saldoPatrimonio / Math.pow(1 + inflacionAnual, anoActual)));
            etiquetasGrafico.push(`${anoActual}`);
            // Guardar datos para exportar al final de cada año
            datosParaExportar.push({
                ano: anoActual,
                patrimonio: Math.round(saldoPatrimonio),
                depositos: Math.round(totalDepositos)
            });
        }
    }

    const dineroFormateado = formatearDinero(saldoPatrimonio, moneda);
    resTotal.textContent = dineroFormateado;
    resRetiro.textContent = formatearDinero((saldoPatrimonio * 0.04) / 12, moneda);
    
    // Rellenar dinámicamente el bloque informativo rediseñado
    resAnios.textContent = anos;
    resMonto.textContent = dineroFormateado;
    contenedorMensajes.classList.remove('hidden');

    // Inicializar o refrescar Chart.js
    const ctx = document.getElementById('graficoPatrimonio').getContext('2d');
    if (grafico) grafico.destroy();

    grafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: etiquetasGrafico,
            datasets: [
                { label: trad.lineas[0], data: datosPatrimonio, borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.08)', fill: true, tension: 0.2 },
                { label: trad.lineas[1], data: datosAjustados, borderColor: '#38bdf8', borderDash: [4, 4], fill: false, tension: 0.2 },
                { label: trad.lineas[2], data: datosDepositos, borderColor: '#f59e0b', fill: false, tension: 0.2 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            rtl: trad.dir === "rtl",
            scales: {
                y: { position: trad.dir === "rtl" ? 'right' : 'left', grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } },
                x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } }
            },
            plugins: { legend: { rtl: trad.dir === "rtl", labels: { color: '#e2e8f0', usePointStyle: true } } }
        }
    });
// Llamada al nuevo motor de escenarios
    calcularEscenarios(inversionInicial, parseInt(inputAnos.value), parseFloat(inputInteres.value), parseFloat(inputInflacion.value));
}

// --- ESCUCHADORES DE ACCIONES ---
btnCalcular.addEventListener('click', calcularProyeccion);

btnReiniciar.addEventListener('click', () => {
    inputInvInicial.value = 0;
    sliderFase1.value = 0;
    sliderFase2.value = 0;
    sliderFase3.value = 0;
    selectFrecuenciaExtra.value = "999";
    inputMontoExtra.value = 0;
    inputAnos.value = 0;
    inputInteres.value = 0;
    inputInflacion.value = 0;
    
    contenedorMensajes.classList.add('hidden');
    localizarInterfaz();
    calcularProyeccion();
});

selectIdiomaApp.addEventListener('change', () => { localizarInterfaz(); calcularProyeccion(); });
selectMoneda.addEventListener('change', () => { localizarInterfaz(); calcularProyeccion(); });

[sliderFase1, sliderFase2, sliderFase3].forEach(el => {
    el.addEventListener('input', localizarInterfaz);
});

// Carga Inicial Limpia
localizarInterfaz();
calcularProyeccion();
function calcularEscenarios(inversionInicial, anos, tasaBase, inflacionBase) {
    const calcular = (tasa) => {
        let saldo = inversionInicial;
        let tasaMensual = Math.pow(1 + (tasa/100), 1/12) - 1;
        // Se calcula con un promedio de aportes basado en los sliders actuales
        let aporteProm = (parseFloat(sliderFase1.value) + parseFloat(sliderFase2.value) + parseFloat(sliderFase3.value)) / 3;
        for (let i = 0; i < anos * 12; i++) { saldo = (saldo + aporteProm) * (1 + tasaMensual); }
        return saldo;
    };
    
    const moneda = document.getElementById('moneda').value;
    document.getElementById('resPesimista').textContent = formatearDinero(calcular(tasaBase - 2), moneda);
    document.getElementById('resBase').textContent = formatearDinero(calcular(tasaBase), moneda);
    document.getElementById('resOptimista').textContent = formatearDinero(calcular(tasaBase + 2), moneda);
}
// 1. Botón principal: Solo muestra/oculta la tabla
document.getElementById('btnExportar').addEventListener('click', () => {
    if (datosParaExportar.length === 0) return alert("Calcula primero.");
    const contenedor = document.getElementById('contenedorTabla');
    const cuerpo = document.getElementById('cuerpoTabla');
    
    // Rellenar tabla
    cuerpo.innerHTML = '';
    datosParaExportar.forEach(row => {
        cuerpo.innerHTML += `<tr class="border-b border-slate-800">
            <td class="p-2">${row.ano}</td>
            <td class="p-2">${formatearDinero(row.patrimonio, selectMoneda.value)}</td>
            <td class="p-2">${formatearDinero(row.depositos, selectMoneda.value)}</td>
        </tr>`;
    });
    
    // Mostrar u ocultar contenedor
    contenedor.classList.toggle('hidden');
    // Asegurar que el menú esté oculto al abrir la tabla
    document.getElementById('menuAcciones').classList.add('hidden');
});

// 2. Botón del menú (tres líneas ☰): Abre/cierra el menú
document.getElementById('btnMenuAcciones').addEventListener('click', (e) => {
    e.stopPropagation(); 
    document.getElementById('menuAcciones').classList.toggle('hidden');
});

// 3. Opción: Descargar CSV
document.getElementById('btnDescargarCSV').addEventListener('click', () => {
    let csvContent = "Año,Patrimonio,Depósitos\n";
    datosParaExportar.forEach(row => { csvContent += `${row.ano},${row.patrimonio},${row.depositos}\n`; });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'proyeccion.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    document.getElementById('menuAcciones').classList.add('hidden');
});

// Opción: Descargar Excel
document.getElementById('btnDescargarXLS').addEventListener('click', () => {
    let content = "Año\tPatrimonio\tDepósitos\n"; 
    datosParaExportar.forEach(row => { 
        content += `${row.ano}\t${row.patrimonio}\t${row.depositos}\n`; 
    });
    const blob = new Blob([content], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'proyeccion.xls';
    a.click();
    window.URL.revokeObjectURL(url);
    document.getElementById('menuAcciones').classList.add('hidden');
});

// Opción: Descargar PDF
document.getElementById('btnDescargarPDF').addEventListener('click', () => {
    const ventana = window.open('', '', 'height=600,width=800');
    ventana.document.write('<html><head><title>Proyección Patrimonial</title>');
    ventana.document.write('<style>table {width:100%; border-collapse:collapse;} th,td {border:1px solid #000; padding:8px; text-align:left;}</style>');
    ventana.document.write('</head><body>');
    ventana.document.write('<h1>Reporte de Simulación</h1>');
    ventana.document.write(document.getElementById('contenedorTabla').querySelector('table').outerHTML);
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.print(); 
    document.getElementById('menuAcciones').classList.add('hidden');
});

// 4. Opción: Cerrar Tabla
document.getElementById('btnCerrarTabla').addEventListener('click', () => {
    document.getElementById('contenedorTabla').classList.add('hidden');
    document.getElementById('menuAcciones').classList.add('hidden');
});

// 5. Cierre automático: Cierra el menú al hacer clic fuera
document.addEventListener('click', (e) => {
    const menu = document.getElementById('menuAcciones');
    const btnMenu = document.getElementById('btnMenuAcciones');
    if (menu && !menu.contains(e.target) && e.target !== btnMenu) {
        menu.classList.add('hidden');
    }
});

// Lógica del botón flotante "Volver al inicio"
const btnVolver = document.getElementById('btnVolverArriba');

window.addEventListener('scroll', () => {
    if (btnVolver) {
        if (window.scrollY > 300) {
            btnVolver.classList.remove('hidden');
        } else {
            btnVolver.classList.add('hidden');
        }
    }
});

btnVolver.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// Carga Inicial en 0
inputInvInicial.value = 0;
sliderFase1.value = 0;
sliderFase2.value = 0;
sliderFase3.value = 0;
selectFrecuenciaExtra.value = "999";
inputMontoExtra.value = 0;
inputAnos.value = 0;
inputInteres.value = 0;
inputInflacion.value = 0;

localizarInterfaz();
calcularProyeccion();