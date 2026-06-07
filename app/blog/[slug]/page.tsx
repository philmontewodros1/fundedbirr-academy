import type { Metadata } from 'next'
import Link from 'next/link'

const articles: Record<string, {
  title: string; desc: string; category: string; readTime: string;
  content: string[]; relatedSlugs: string[]
}> = {
  'how-to-trade-gold-ethiopia': {
    title: 'How to Trade Gold (XAUUSD) in Ethiopia',
    desc: 'A complete guide for Ethiopian traders looking to trade gold. Learn about XAU/USD, key drivers, and practical strategies.',
    category: 'Gold Trading', readTime: '8 min read',
    content: [
      'Gold (XAUUSD) is the most traded commodity in Ethiopia\'s forex community. Unlike currency pairs, gold offers unique advantages for Ethiopian traders including strong volatility during London and New York sessions.',
      'Why Trade Gold in Ethiopia?',
      'Gold is globally recognized and highly liquid. For Ethiopian traders, XAUUSD provides excellent opportunities because it moves significantly during the London session (11am Ethiopia time) and New York session (4pm Ethiopia time). The London-New York overlap (1pm-5pm Ethiopia time) is when gold sees its biggest moves.',
      'Key Drivers of Gold Prices:',
      '1. US Dollar Strength — Gold is priced in USD. When the dollar weakens, gold typically rises. When the dollar strengthens, gold falls. This inverse correlation is one of the most reliable relationships in financial markets.',
      '2. Interest Rates — When US interest rates are low, gold becomes more attractive because it doesn\'t pay interest. When rates rise, gold often falls as investors seek yield elsewhere.',
      '3. Inflation — Gold is a traditional hedge against inflation. When inflation rises, gold prices tend to increase as people seek to preserve their purchasing power.',
      '4. Geopolitical Events — Wars, elections, trade disputes, and economic crises all drive gold prices. Gold is considered a "safe haven" asset that investors buy during uncertainty.',
      '5. Central Bank Buying — Central banks around the world accumulate gold as part of their reserves. Large-scale buying can push prices higher.',
      'Practical Tips for Ethiopian Traders:',
      '• Focus on the London and New York sessions for the best gold moves',
      '• Watch the US Dollar Index (DXY) for directional clues',
      '• Use support and resistance levels on the 1-hour and 4-hour timeframes',
      '• Always use stop-losses — gold can be volatile and move 50+ points in minutes',
      '• Start with a demo account before trading real money',
      'Gold trading requires practice and discipline. Take our free "Introduction to Gold" course to build your foundation before trading.',
    ],
    relatedSlugs: ['gold-trading-sessions-ethiopia', 'what-is-forex-trading'],
  },
  'what-is-forex-trading': {
    title: 'What is Forex Trading? Beginner\'s Guide',
    desc: 'Everything you need to know to start trading forex. From currency pairs to spreads, we break it down in simple terms.',
    category: 'Forex Basics', readTime: '6 min read',
    content: [
      'Forex (foreign exchange) trading is the act of buying and selling currencies. It is the largest financial market in the world, with over $6 trillion traded daily — that\'s more than all stock markets combined.',
      'How Forex Works:',
      'Unlike stock markets, forex has no central exchange. Trading happens electronically over-the-counter (OTC) through a global network of banks, brokers, and traders. The market is open 24 hours a day, 5 days a week, starting with the Sydney session on Sunday evening and closing with the New York session on Friday evening.',
      'Currency Pairs Explained:',
      'In forex, currencies are always traded in pairs. The first currency is the base currency, and the second is the quote currency. When you buy EUR/USD, you are buying Euros and selling US Dollars. The exchange rate tells you how much of the quote currency you need to buy one unit of the base currency.',
      'Major Pairs: EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, NZD/USD — these are the most traded pairs and typically have the lowest spreads.',
      'Minor Pairs: EUR/GBP, EUR/JPY, GBP/JPY — these don\'t include USD but are still actively traded.',
      'Exotic Pairs: USD/TRY, USD/ZAR, USD/ETB (though not widely available) — these have wider spreads and less liquidity.',
      'Key Terminology:',
      '• Pip — The smallest price movement in a currency pair. For most pairs, 1 pip = 0.0001.',
      '• Spread — The difference between the bid (sell) and ask (buy) price. This is how brokers make money.',
      '• Leverage — Borrowed capital that allows you to control larger positions with a smaller deposit. In Ethiopia, leverage is typically 1:50 to 1:200.',
      '• Margin — The amount of money required to open a leveraged position.',
      'For Ethiopian traders starting out, we recommend beginning with a demo account and focusing on one or two pairs. XAUUSD and EUR/USD are popular starting points.',
    ],
    relatedSlugs: ['how-to-trade-gold-ethiopia', 'candlestick-patterns-guide'],
  },
  'candlestick-patterns-guide': {
    title: 'Understanding Candlestick Patterns',
    desc: 'Master price action with this guide to candlestick patterns. Learn dojis, engulfing, hammers, and shooting stars.',
    category: 'Technical Analysis', readTime: '10 min read',
    content: [
      'Candlestick charts are the most popular way to visualize price movements in forex and gold trading. Each candle shows four pieces of information: the opening price, closing price, highest price, and lowest price for a specific time period.',
      'Candle Anatomy:',
      'A candle has a body (the difference between open and close) and wicks (also called shadows — the lines extending above and below the body). If the close is higher than the open, the candle is typically green or white (bullish). If the close is lower than the open, the candle is red or black (bearish).',
      'Important Bullish Patterns:',
      '1. Hammer — A small body with a long lower wick. Appears after a downtrend and signals a potential reversal upward. The long lower wick shows that sellers pushed prices down but buyers regained control.',
      '2. Bullish Engulfing — A large green candle that completely engulfs the previous red candle. This is a strong reversal signal after a downtrend.',
      '3. Morning Star — A three-candle pattern: a long red candle, a small-bodied candle (doji or spinning top), and a long green candle. Signals a strong reversal from bearish to bullish.',
      '4. Piercing Pattern — A green candle that closes above the midpoint of the previous red candle. Signals a potential upward reversal.',
      'Important Bearish Patterns:',
      '1. Shooting Star — A small body with a long upper wick. Appears after an uptrend and signals a potential reversal downward. The long upper wick shows that buyers pushed prices up but sellers took control.',
      '2. Bearish Engulfing — A large red candle that completely engulfs the previous green candle. A strong reversal signal after an uptrend.',
      '3. Evening Star — The opposite of the morning star: a long green candle, a small-bodied candle, and a long red candle. Signals a reversal from bullish to bearish.',
      '4. Dark Cloud Cover — A red candle that opens above the previous green candle\'s close and closes below its midpoint.',
      'Continuation Patterns:',
      '1. Doji — A candle where the open and close are virtually equal. It shows indecision in the market. A doji after an uptrend may signal a potential reversal; a doji in a range suggests continuation.',
      '2. Spinning Top — A small body with wicks on both sides. Shows indecision similar to a doji but with a slightly larger body.',
      '3. Marubozu — A candle with no wicks, meaning the open equals the low and the close equals the high (or vice versa). Shows strong momentum.',
      'Tips for Ethiopian Traders:',
      '• Focus on patterns on the 1-hour and 4-hour timeframes for more reliable signals',
      '• Always confirm patterns with support/resistance levels or volume',
      '• Practice identifying patterns on historical charts before trading live',
      '• Combine candlestick patterns with market structure for best results',
    ],
    relatedSlugs: ['risk-management-guide', 'how-to-choose-trading-strategy'],
  },
  'risk-management-guide': {
    title: 'Risk Management: The Most Important Skill',
    desc: 'Why protecting your capital matters more than finding the perfect entry. Position sizing, stop-losses, and risk-reward ratios.',
    category: 'Risk Management', readTime: '7 min read',
    content: [
      'The single biggest difference between successful and unsuccessful traders is not their entry strategy — it\'s their risk management. You can have a 40% win rate and still be consistently profitable if your risk management is sound.',
      'The Golden Rule:',
      'Never risk more than 1-2% of your trading capital on a single trade. If you have a 50,000 ETB account, your maximum risk per trade should be 500-1,000 ETB. This ensures that even a series of losses won\'t wipe out your account.',
      'Position Sizing:',
      'Position sizing determines how much you trade based on your account size, risk percentage, and stop-loss distance. The formula is:',
      'Position Size = (Account Balance × Risk %) ÷ Stop Loss Distance',
      'Example: 50,000 ETB account, risking 1% (500 ETB), stop-loss of 50 pips: Position size = 500 ÷ 50 = 10 units (or mini lots).',
      'Stop-Losses:',
      'A stop-loss is an order that automatically closes your trade at a predetermined price level if the market moves against you. Always use a stop-loss. Without one, a single unexpected market move can wipe out your account.',
      'Types of stop-losses:',
      '• Fixed Stop — Set at a specific price level based on technical analysis',
      '• Trailing Stop — Moves with the price in your favor, locking in profits',
      '• Time Stop — Close a trade if it hasn\'t moved in your direction within a certain time',
      'Risk-Reward Ratio:',
      'Your risk-reward ratio (RR) compares the potential profit of a trade to the potential loss. A minimum 1:2 RR means you risk 1 unit to make 2 units. With a 1:2 RR, you only need to win 34% of your trades to be profitable.',
      'The Mathematics of Trading:',
      'Win rate alone doesn\'t matter — it\'s the combination of win rate and average risk-reward that determines profitability. A trader with a 40% win rate and 1:3 RR is more profitable than a trader with a 70% win rate and 1:0.5 RR.',
      'Drawdown Control:',
      'Drawdown is the peak-to-trough decline in your trading account. The best traders keep their maximum drawdown below 20%. When you hit your drawdown limit, stop trading and review your strategy.',
      'For Ethiopian traders, risk management is especially important because leverage amplifies both gains and losses. Always start with lower leverage (1:50 or less) and focus on capital preservation.',
    ],
    relatedSlugs: ['candlestick-patterns-guide', 'how-to-trade-gold-ethiopia'],
  },
  'how-to-choose-trading-strategy': {
    title: 'How to Choose a Trading Strategy',
    desc: 'Find what works for you. A practical guide to matching your personality with the right trading approach.',
    category: 'Trading Psychology', readTime: '9 min read',
    content: [
      'There is no "best" trading strategy — only the best strategy for YOU. The right strategy depends on your personality, lifestyle, risk tolerance, and available time.',
      'Step 1: Know Your Schedule',
      '• If you have a full-time job: Look for strategies that work on the 4-hour or daily timeframe. You don\'t need to watch charts all day.',
      '• If you can trade part-time: The 1-hour timeframe works well. You can analyze before work and check during breaks.',
      '• If you can trade full-time: Lower timeframes (15-min to 1-hour) offer more opportunities but require more screen time.',
      'Step 2: Know Your Personality',
      '• Patient and analytical: Swing trading or position trading suits you. Wait for high-probability setups on higher timeframes.',
      '• Quick decision-maker: Day trading or scalping might work. Fast entries and exits based on technical patterns.',
      '• Somewhere in between: A hybrid approach — use higher timeframes for direction and lower timeframes for entries.',
      'Popular Strategy Types:',
      '1. Trend Following — The simplest and most reliable approach. Identify the trend (uptrend or downtrend) and trade in that direction. Use moving averages (50, 100, 200) to identify the trend.',
      '2. Support and Resistance — Mark key price levels where the market has historically reversed. Buy near support in an uptrend, sell near resistance in a downtrend.',
      '3. Breakout Trading — Enter when price breaks through a key level with momentum. Works well during high-volatility sessions.',
      '4. Order Flow / Supply and Demand — Identify zones where institutional traders have placed large orders. More advanced but very effective.',
      '5. Price Action — Pure candlestick patterns and market structure without indicators. Clean and effective once mastered.',
      'Step 3: Test Before You Commit',
      '• Backtest your strategy on at least 100 historical trades',
      '• Forward test on a demo account for at least 1 month',
      '• Track every trade in a journal — entry reason, exit reason, emotions, outcome',
      '• Only trade real money when your demo results show consistent profitability',
      'A strategy that makes 5% per month with a 15% drawdown is better than a strategy that makes 20% per month with a 60% drawdown. Consistency and capital preservation always win in the long run.',
    ],
    relatedSlugs: ['risk-management-guide', 'what-is-forex-trading'],
  },
  'gold-trading-sessions-ethiopia': {
    title: 'Gold Trading Sessions: Best Times for Ethiopians',
    desc: 'When to trade gold from Ethiopia. Learn about the London, New York, and Asian sessions and their overlap hours.',
    category: 'Gold Trading', readTime: '6 min read',
    content: [
      'One of the biggest advantages of forex and gold trading is the 24-hour market. But not all hours are created equal. Knowing when to trade — and when to stay out — can significantly impact your results.',
      'Ethiopia Time (UTC+3) Reference:',
      '• Sydney Session: 9:00 PM — 6:00 AM Ethiopia time (overnight, low volatility)',
      '• Tokyo Session: 12:00 AM — 9:00 AM Ethiopia time (moderate, focused on yen pairs)',
      '• London Session: 8:00 AM — 5:00 PM Ethiopia time (HIGHEST VOLUME, best for gold)',
      '• New York Session: 1:00 PM — 10:00 PM Ethiopia time (high volume, USD pairs active)',
      'Best Time for Gold (XAUUSD):',
      'Gold is most active during the London session (8am-5pm Ethiopia time) and the London-New York overlap (1pm-5pm Ethiopia time). This is when gold sees its largest moves because London is the global hub for gold trading and New York brings additional liquidity.',
      'Best Time for Forex:',
      '• EUR/USD and GBP/USD: London session (8am-5pm) and London-New York overlap (1pm-5pm)',
      '• USD/JPY: Tokyo session (midnight-9am) and New York session (1pm-10pm)',
      '• Gold (XAUUSD): London session and London-New York overlap',
      'Session Characteristics:',
      'Sydney — Quiet, ranges are tight, good for setting up pending orders. Low volatility until Tokyo opens.',
      'Tokyo — Moderate activity. USD/JPY and AUD/JPY are most active. Gold moves during Tokyo but less than London.',
      'London — The most important session. Over 30% of all forex volume flows through London. This is when trends often start and breakouts happen. Best for gold.',
      'New York — The afternoon session for Ethiopia. The first 2 hours (1pm-3pm) overlap with London and are the most volatile of the day. News releases (US economic data) happen during this session.',
      'Trading Schedule for Ethiopian Traders:',
      '• Morning (8am-11am): London session — analyze markets, identify key levels, look for entries in gold and major pairs',
      '• Midday (11am-1pm): London continues — trends established in the morning may continue or reverse',
      '• Afternoon (1pm-5pm): London-New York overlap — highest volatility, best trading opportunities',
      '• Evening (5pm-10pm): New York alone — news-driven moves, focus on USD pairs',
      'Friday afternoon is typically quieter as traders close positions before the weekend. Sunday evening (Sydney open) can have gap moves from weekend news — be cautious.',
    ],
    relatedSlugs: ['how-to-trade-gold-ethiopia', 'what-is-forex-trading'],
  },
}

export function generateStaticParams() {
  return Object.keys(articles).map(slug => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articles[params.slug]
  if (!article) return { title: 'Article Not Found — FundedBirr Academy' }
  return {
    title: `${article.title} — FundedBirr Academy`,
    description: article.desc,
  }
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug]
  if (!article) {
    return (
      <section className="section" style={{ textAlign: 'center', paddingTop: '6rem' }}>
        <h1 className="section-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
        <p className="section-sub" style={{ margin: '0 auto 2rem' }}>Article not found.</p>
        <Link href="/blog" className="btn-primary" style={{ textDecoration: 'none' }}>← Back to Blog</Link>
      </section>
    )
  }

  return (
    <>
      <section className="section" style={{ paddingTop: '6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <span style={{ opacity: 0.5 }}>/</span>
          <Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blog</Link>
          <span style={{ opacity: 0.5 }}>/</span>
          <span style={{ color: 'var(--text)' }}>{article.title}</span>
        </div>

        <span className="tag" style={{
          display: 'inline-block', fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px',
          borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem',
          background: 'rgba(30,111,217,0.1)', color: 'var(--blue-light)', border: '1px solid rgba(30,111,217,0.2)',
        }}>
          {article.category}
        </span>

        <h1 className="section-title" style={{ maxWidth: '700px' }}>{article.title}</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          <span>{article.readTime}</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>FundedBirr Academy</span>
        </div>
      </section>

      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 2rem 3rem' }}>
        <div style={{ lineHeight: 1.9, fontSize: '0.95rem', color: 'var(--text)' }}>
          {article.content.map((paragraph, i) => {
            const isHeading = !paragraph.startsWith('•') && !paragraph.startsWith('—') && paragraph.endsWith(':')
            const isBullet = paragraph.startsWith('•') || paragraph.startsWith('—')
            if (isHeading) {
              return <h2 key={i} style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', margin: '2rem 0 0.75rem' }}>{paragraph}</h2>
            }
            if (isBullet) {
              return <p key={i} style={{ paddingLeft: '1rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>{paragraph}</p>
            }
            return <p key={i} style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>{paragraph}</p>
          })}
        </div>

        <div style={{ marginTop: '3rem', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(40,168,106,0.2)', background: 'rgba(40,168,106,0.03)' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text)', fontWeight: 600, marginBottom: '0.5rem' }}>
            Ready to learn more?
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Start a free course and build your trading skills step by step.
          </p>
          <Link href="/courses" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Start Free Course →
          </Link>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
          <Link href="/blog" style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
            ← Back to all articles
          </Link>
        </div>
      </section>
    </>
  )
}
