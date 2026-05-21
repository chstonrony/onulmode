import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/lib/getLocale";

export const metadata: Metadata = {
  title: "Privacy Policy | OnulMood",
  description: "Privacy policy for OnulMood service.",
};

const CONTENT = {
  ko: {
    back: "← 오늘무드",
    title: "개인정보처리방침",
    updated: "최종 업데이트: 2026년 5월 14일",
    intro: "오늘무드(이하 \"서비스\")는 사용자의 개인정보를 소중히 여기며, 「개인정보 보호법」을 준수합니다. 본 방침은 서비스 이용 시 수집되는 정보와 그 활용 방식을 안내합니다.",
    sections: [
      {
        title: "1. 수집하는 개인정보 항목",
        items: [
          "자동 수집 정보: 접속 IP, 브라우저 종류, 방문 일시, 서비스 이용 기록",
          "로컬 저장 데이터: 감정 기록 데이터 (브라우저 localStorage에만 저장, 서버 전송 없음)",
          "광고 관련: Google AdSense를 통한 쿠키 및 광고 식별자",
        ],
      },
      {
        title: "2. 개인정보의 수집 및 이용 목적",
        items: [
          "서비스 운영 및 개선",
          "광고 게재 및 분석 (Google AdSense)",
          "서비스 이용 통계 분석",
          "법적 의무 이행",
        ],
      },
      {
        title: "3. 개인정보 보유 및 이용 기간",
        body: "감정 기록 데이터: 사용자가 브라우저 데이터를 삭제하면 즉시 소멸됩니다. 서버에는 저장되지 않습니다.\n자동 수집 정보: 관련 법령에 따라 최대 1년간 보유 후 파기합니다.",
      },
      {
        title: "4. 개인정보의 제3자 제공",
        body: "오늘무드는 원칙적으로 사용자의 개인정보를 외부에 제공하지 않습니다. 단, Google AdSense 광고 서비스 운영을 위해 Google과의 데이터 공유가 발생할 수 있습니다.",
      },
      {
        title: "5. 쿠키(Cookie) 사용",
        body: "서비스는 Google AdSense 광고 게재를 위해 쿠키를 사용합니다. 브라우저 설정을 통해 쿠키 수집을 거부할 수 있으나, 일부 서비스 이용이 제한될 수 있습니다.",
      },
      {
        title: "6. 사용자의 권리",
        items: [
          "개인정보 열람 요청",
          "개인정보 정정·삭제 요청",
          "개인정보 처리 정지 요청",
          "광고 맞춤 설정 거부: Google 광고 설정 페이지에서 변경 가능",
        ],
      },
      {
        title: "7. 개인정보 보호 책임자",
        body: "이메일: chston0603@gmail.com\n문의사항이 있으시면 위 이메일로 연락해 주세요. 확인 후 10일 이내에 답변 드리겠습니다.",
      },
      {
        title: "8. 방침 변경",
        body: "본 개인정보처리방침은 법령 또는 서비스 변경에 따라 수정될 수 있습니다. 변경 시 서비스 내 공지를 통해 안내합니다.",
      },
    ],
    footer: "© 2026 오늘무드. All rights reserved.",
  },
  en: {
    back: "← OnulMood",
    title: "Privacy Policy",
    updated: "Last Updated: May 14, 2026",
    intro: "OnulMood (\"Service\") values your personal information and complies with applicable privacy laws. This policy explains what information is collected when you use the service and how it is used.",
    sections: [
      {
        title: "1. Information We Collect",
        items: [
          "Automatically collected: IP address, browser type, visit timestamp, usage logs",
          "Locally stored data: Emotion records (stored only in browser localStorage, never sent to server)",
          "Advertising: Cookies and ad identifiers via Google AdSense",
        ],
      },
      {
        title: "2. Purpose of Collection",
        items: [
          "Service operation and improvement",
          "Ad delivery and analytics (Google AdSense)",
          "Usage statistics",
          "Legal compliance",
        ],
      },
      {
        title: "3. Retention Period",
        body: "Emotion records: Deleted immediately when you clear browser data. Never stored on our servers.\nAutomatically collected data: Retained for up to 1 year as required by law, then deleted.",
      },
      {
        title: "4. Third-Party Sharing",
        body: "OnulMood does not share your personal information with third parties as a rule. Data sharing with Google may occur for the operation of Google AdSense advertising.",
      },
      {
        title: "5. Cookie Usage",
        body: "The service uses cookies to serve Google AdSense ads. You may disable cookies via browser settings, though some features may be limited.",
      },
      {
        title: "6. Your Rights",
        items: [
          "Access your personal information",
          "Request correction or deletion",
          "Request processing restriction",
          "Opt out of personalized ads: Adjustable in Google's ad settings",
        ],
      },
      {
        title: "7. Privacy Contact",
        body: "Email: chston0603@gmail.com\nWe will respond within 10 business days.",
      },
      {
        title: "8. Policy Updates",
        body: "This privacy policy may be updated due to changes in law or service. Updates will be announced within the service.",
      },
    ],
    footer: "© 2026 OnulMood. All rights reserved.",
  },
  ja: {
    back: "← オヌルムード",
    title: "プライバシーポリシー",
    updated: "最終更新日: 2026年5月14日",
    intro: "オヌルムード（以下「サービス」）はユーザーの個人情報を大切にし、適用される個人情報保護法に準拠しています。本ポリシーは、サービス利用時に収集される情報とその利用方法を説明します。",
    sections: [
      {
        title: "1. 収集する個人情報",
        items: [
          "自動収集情報: IPアドレス、ブラウザの種類、訪問日時、利用記録",
          "ローカル保存データ: 感情記録データ（ブラウザのlocalStorageにのみ保存、サーバーには送信されません）",
          "広告関連: Google AdSenseによるCookieおよび広告識別子",
        ],
      },
      {
        title: "2. 収集・利用目的",
        items: [
          "サービスの運営と改善",
          "広告配信と分析（Google AdSense）",
          "利用統計の分析",
          "法的義務の履行",
        ],
      },
      {
        title: "3. 保有期間",
        body: "感情記録データ: ブラウザデータを削除した時点で即時消滅。サーバーには保存されません。\n自動収集情報: 法令に基づき最大1年間保有後、削除します。",
      },
      {
        title: "4. 第三者提供",
        body: "オヌルムードは原則としてユーザーの個人情報を外部に提供しません。ただし、Google AdSense広告サービスの運営のためGoogleとのデータ共有が発生する場合があります。",
      },
      {
        title: "5. Cookieの使用",
        body: "サービスはGoogle AdSense広告配信のためにCookieを使用します。ブラウザ設定でCookieを無効にできますが、一部の機能が制限される場合があります。",
      },
      {
        title: "6. ユーザーの権利",
        items: [
          "個人情報の閲覧請求",
          "個人情報の訂正・削除請求",
          "個人情報処理の停止請求",
          "広告カスタマイズの拒否: Google広告設定ページで変更可能",
        ],
      },
      {
        title: "7. プライバシー担当者",
        body: "メール: chston0603@gmail.com\n10営業日以内にご返答いたします。",
      },
      {
        title: "8. ポリシーの変更",
        body: "本ポリシーは法令またはサービスの変更に伴い修正される場合があります。変更時はサービス内でお知らせします。",
      },
    ],
    footer: "© 2026 OnulMood. All rights reserved.",
  },
  es: {
    back: "← OnulMood",
    title: "Política de Privacidad",
    updated: "Última actualización: 14 de mayo de 2026",
    intro: "OnulMood (\"Servicio\") valora tu información personal y cumple con las leyes de privacidad aplicables. Esta política explica qué información se recopila cuando usas el servicio y cómo se utiliza.",
    sections: [
      {
        title: "1. Información que Recopilamos",
        items: [
          "Recopilada automáticamente: dirección IP, tipo de navegador, marca de tiempo de visita, registros de uso",
          "Datos almacenados localmente: registros de emociones (solo en localStorage del navegador, nunca enviados al servidor)",
          "Publicidad: cookies e identificadores de anuncios mediante Google AdSense",
        ],
      },
      {
        title: "2. Propósito de la Recopilación",
        items: [
          "Operación y mejora del servicio",
          "Entrega de anuncios y análisis (Google AdSense)",
          "Estadísticas de uso",
          "Cumplimiento legal",
        ],
      },
      {
        title: "3. Período de Retención",
        body: "Registros de emociones: eliminados inmediatamente al borrar datos del navegador. Nunca almacenados en nuestros servidores.\nDatos recopilados automáticamente: retenidos hasta 1 año según lo exige la ley, luego eliminados.",
      },
      {
        title: "4. Compartir con Terceros",
        body: "OnulMood no comparte tu información personal con terceros como norma. Puede ocurrir intercambio de datos con Google para la operación de publicidad de Google AdSense.",
      },
      {
        title: "5. Uso de Cookies",
        body: "El servicio utiliza cookies para mostrar anuncios de Google AdSense. Puedes desactivar las cookies en la configuración del navegador, aunque algunas funciones pueden verse limitadas.",
      },
      {
        title: "6. Tus Derechos",
        items: [
          "Acceder a tu información personal",
          "Solicitar corrección o eliminación",
          "Solicitar restricción del procesamiento",
          "Optar por no recibir anuncios personalizados: ajustable en configuración de anuncios de Google",
        ],
      },
      {
        title: "7. Contacto de Privacidad",
        body: "Email: chston0603@gmail.com\nResponderemos en un plazo de 10 días hábiles.",
      },
      {
        title: "8. Actualizaciones de la Política",
        body: "Esta política de privacidad puede actualizarse debido a cambios en la ley o el servicio. Los cambios se anunciarán dentro del servicio.",
      },
    ],
    footer: "© 2026 OnulMood. All rights reserved.",
  },
  zh: {
    back: "← OnulMood",
    title: "隐私政策",
    updated: "最后更新：2026年5月14日",
    intro: "OnulMood（\"服务\"）重视您的个人信息，并遵守适用的隐私法律。本政策说明您使用服务时收集的信息及其使用方式。",
    sections: [
      {
        title: "1. 我们收集的信息",
        items: [
          "自动收集信息：IP地址、浏览器类型、访问时间戳、使用日志",
          "本地存储数据：情绪记录（仅存储在浏览器localStorage中，从不发送到服务器）",
          "广告相关：通过Google AdSense的Cookie和广告标识符",
        ],
      },
      {
        title: "2. 收集目的",
        items: [
          "服务运营和改进",
          "广告投放和分析（Google AdSense）",
          "使用统计",
          "法律合规",
        ],
      },
      {
        title: "3. 保留期限",
        body: "情绪记录：清除浏览器数据时立即删除，从不存储在我们的服务器上。\n自动收集的数据：按法律要求保留最多1年后删除。",
      },
      {
        title: "4. 第三方共享",
        body: "OnulMood原则上不与第三方共享您的个人信息。为运营Google AdSense广告服务，可能会与Google发生数据共享。",
      },
      {
        title: "5. Cookie使用",
        body: "服务使用Cookie来投放Google AdSense广告。您可以通过浏览器设置禁用Cookie，但某些功能可能会受到限制。",
      },
      {
        title: "6. 您的权利",
        items: [
          "访问您的个人信息",
          "请求更正或删除",
          "请求处理限制",
          "选择退出个性化广告：可在Google广告设置中调整",
        ],
      },
      {
        title: "7. 隐私联系方式",
        body: "邮箱：chston0603@gmail.com\n我们将在10个工作日内回复。",
      },
      {
        title: "8. 政策更新",
        body: "本隐私政策可能因法律或服务变更而更新。变更将在服务内公告。",
      },
    ],
    footer: "© 2026 OnulMood. All rights reserved.",
  },
} as const;

export default async function PrivacyPage() {
  const locale = await getLocale();
  const c = CONTENT[locale] ?? CONTENT.ko;

  return (
    <div style={{ background: "#efe3cf", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>

        <Link href="/" style={{ fontSize: 13, color: "#A89880", textDecoration: "none", fontFamily: "var(--font-serif)" }}>
          {c.back}
        </Link>

        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#2A2520", fontFamily: "var(--font-serif)", margin: "20px 0 8px" }}>
          {c.title}
        </h1>
        <p style={{ fontSize: 13, color: "#A89880", marginBottom: 40 }}>{c.updated}</p>

        <div style={{ background: "#F5EFE0", borderRadius: 4, padding: "20px 24px", marginBottom: 36, border: "1px solid #D8CEC0" }}>
          <p style={{ fontSize: 14, color: "#5A5248", lineHeight: 1.8, fontWeight: 300 }}>{c.intro}</p>
        </div>

        {c.sections.map((section, i) => (
          <section key={i} style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#2A2520", marginBottom: 12, borderBottom: "1.5px solid #D8CEC0", paddingBottom: 8 }}>
              {section.title}
            </h2>
            <div style={{ fontSize: 14, color: "#5A5248", lineHeight: 1.85, fontWeight: 300 }}>
              {"items" in section && section.items ? (
                <ul style={{ paddingLeft: 20 }}>
                  {section.items.map((item, j) => (
                    <li key={j} style={{ marginBottom: 6 }}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ whiteSpace: "pre-line" }}>{"body" in section ? section.body : ""}</p>
              )}
            </div>
          </section>
        ))}

        <div style={{ borderTop: "1px solid #D8CEC0", paddingTop: 24, marginTop: 48 }}>
          <p style={{ fontSize: 12, color: "#A89880", textAlign: "center" }}>{c.footer}</p>
        </div>
      </div>
    </div>
  );
}
