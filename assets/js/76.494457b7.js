(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{509:function(t,s,a){"use strict";a.r(s);var n=a(1),r=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"til-조건문"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#til-조건문"}},[t._v("#")]),t._v(" TIL 조건문")]),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("특정 조건을 만족할 경우 (true값을 받는 경우) 해당하는 실행내용을 실행하도록 하는 기능")]),t._v(" "),s("h2",{attrs:{id:"비교-연산자-comparison-operator"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#비교-연산자-comparison-operator"}},[t._v("#")]),t._v(" 비교 연산자(comparison operator)")]),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("비교 연산자는 늘 Boolean 값을 return 한다. 즉, true or false이다.")]),t._v(" "),s("blockquote",[s("p",[t._v("⇒ 초과")])]),t._v(" "),s("p",[t._v("< ⇒미만")]),t._v(" "),s("p",[t._v("≥ ⇒ 이상")]),t._v(" "),s("p",[t._v("≤ ⇒ 이하")]),t._v(" "),s("p",[t._v("== ⇒ 단순 값만 비교하여 같은 경우 true를 return한다. 0 은 false 1은 true  로 인식하는 컴퓨터 언어의 특성등 예외 경우가 많다.")]),t._v(" "),s("p",[t._v("=== ⇒ 타입과 값이 모두 같은 경우에만 true를 return한다.")]),t._v(" "),s("h2",{attrs:{id:"논리-연산자-logical-operator"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#논리-연산자-logical-operator"}},[t._v("#")]),t._v(" 논리 연산자(Logical Operator)")]),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("&& - AND - 두 가지 다 true 일 때만 true 값을 반환")]),t._v(" "),s("p",[t._v("|| - OR - 둘 중에 하나만 true이여도 true 값을 반환")]),t._v(" "),s("p",[t._v("! - NOT - truthy 와 falsy 여부를 반전")]),t._v(" "),s("p",[t._v('*!undefined ⇒ true, !"hello" ⇒ false')]),t._v(" "),s("p",[t._v("false, null, undefined, 0, NaN, ' ' ⇒ false")]),t._v(" "),s("h2",{attrs:{id:"if"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#if"}},[t._v("#")]),t._v(" IF")]),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("조건문 IF")]),t._v(" "),s("div",{staticClass:"language-jsx extra-class"},[s("pre",{pre:!0,attrs:{class:"language-jsx"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("expr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 실행 코드")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("expr2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 실행 코드")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 실행 코드")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("if 문 동작시 return이 필요한 시기에 바로 변수 할당없이 리턴을 하는것이 효율적이다.")]),t._v(" "),s("h2",{attrs:{id:"switch"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#switch"}},[t._v("#")]),t._v(" switch")]),t._v(" "),s("p",[t._v("switch 조건 분기 리엑트에 들어가면 reducer 구현에 많이 사용되니까 잘 알아두면좋다")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("switch")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("변수명"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("값")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" action\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("값")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" action\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" action\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("이렇게 어떤 변수가 들어오면 그변수의 값이 어떤 case에 해당하는지 찾아서 action에 해당하는 행동을 하도록 시킬수 있다.")]),t._v(" "),s("h1",{attrs:{id:"문자열"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#문자열"}},[t._v("#")]),t._v(" 문자열")]),t._v(" "),s("p",[t._v("문자열은 배열형식으로 저장된다.")]),t._v(" "),s("p",[t._v('str ="Hello workld"')]),t._v(" "),s("p",[t._v('str[0] = "H"')]),t._v(" "),s("p",[t._v("단, index에 접근은 가능하지만 쓸 수는 없음(read-only)")]),t._v(" "),s("p",[t._v("문자열 + 문자열 = 연결된 문자열")]),t._v(" "),s("p",[t._v("문자열 + 다른 타입(배열 포함) = 문자열로 변환되어 반환")]),t._v(" "),s("h3",{attrs:{id:"length-property"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#length-property"}},[t._v("#")]),t._v(" length PROPERTY")]),t._v(" "),s("p",[t._v("문자열의 길이를 알 수 있다.")]),t._v(" "),s("p",[t._v("str.length")]),t._v(" "),s("h3",{attrs:{id:"문자열-메소드"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#문자열-메소드"}},[t._v("#")]),t._v(" 문자열 메소드")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://www.notion.so/0821f29570b5455b928070738f758e78",target:"_blank",rel:"noopener noreferrer"}},[t._v("메소드"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"백틱-backquoto-backtick"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#백틱-backquoto-backtick"}},[t._v("#")]),t._v(" 백틱 (backquoto/backtick)")]),t._v(" "),s("p",[t._v("Javascript에서 템플릿 리터럴(Template literals(Tamplate strings)), 마크다운에서 코드를 강조 하는데 쓰이기도 한다.( ```)")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("줄바꿈을 쉽게 할 수 있다")])]),t._v(" "),s("li",[s("p",[t._v("문자열 내부에 표현식을 포함할 수 있다.")]),t._v(" "),s("ul",[s("li",[t._v("Expression interpolation 표현식 삽입")])]),t._v(" "),s("div",{staticClass:"language-jsx extra-class"},[s("pre",{pre:!0,attrs:{class:"language-jsx"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" b "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("Fifteen is ")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" b"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v(" and\nnot ")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" b"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "Fifteen is 15 and')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// not 20."')]),t._v("\n")])])]),s("ul",[s("li",[t._v("Nesting templates - 중첩 → 대표적으로는 ?(if문)이 있다.")])]),t._v(" "),s("div",{staticClass:"language-jsx extra-class"},[s("pre",{pre:!0,attrs:{class:"language-jsx"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" classes "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'header'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nclasses "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isLargeScreen")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("''")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" item"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("isCollapsed "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("' icon-expander'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("' icon-collapser'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("ul",[s("li",[t._v("tag가 지정된 값을 불러 올 수 있다.")])]),t._v(" "),s("div",{staticClass:"language-jsx extra-class"},[s("pre",{pre:!0,attrs:{class:"language-jsx"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" person "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Mike'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" age "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("28")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("myTag")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("strings"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" personExp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ageExp")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" str0 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" strings"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "That "')]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" str1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" strings"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// " is a "')]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" str2 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" strings"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "."')]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" ageStr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ageExp "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("99")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    ageStr "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'centenarian'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    ageStr "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'youngster'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// We can even return a string built using a template literal")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("str0"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("personExp"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("str1"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("ageStr"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("str2"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" output "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" myTag"),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("That ")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v(" person "),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v(" is a ")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v(" age "),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("output"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// That Mike is a youngster.")]),t._v("\n")])])])])])])}),[],!1,null,null,null);s.default=r.exports}}]);