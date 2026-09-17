---
title: 'Bài 114 — Code Structure'
course: langchain
lesson: 114
status: edited-verified
source: '114 - Code Structure.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/langgraph
- https://docs.pytest.org/
---

# Bài 114 — Code Structure

> Nguồn: `114 - Code Structure.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Vẽ được cây thư mục package graph/nodes/chains/tests + ingestion.
2. Giải thích quy ước 1 node = 1 file, 1 chain = 1 file tương ứng.
3. Viết và chạy test dummy bằng pytest + cấu hình PyCharm runner.
4. Tra code mẫu ở branch `2-project-structure`.

## 2. Nội dung chính theo mạch transcript

### 2.1. Triết lý

- Series inspired by LangChain team tutorial nhưng refactor từ Jupyter notebook sang software production-oriented.
- "Repository structure should reflect our architecture" — cây thư mục phản chiếu nodes/edges của graph. Cách này hợp với tác giả, không claim là chuẩn duy nhất; lợi là dễ maintain, test, extend thêm nodes/edges.

### 2.2. Cây thư mục

1. `graph/` — `graph.py` (nối nodes/edges), `state.py` (GraphState), `const.py` (tên nodes, chống duplication), subpackage `nodes/` (mỗi node một file, mỗi node chạy một LangChain chain).
2. `chains/` — mỗi chain một file tương ứng nodes; subpackage `tests/` + `test_chains.py`.
3. Root `ingestion.py` — download + index vào vector store.

### 2.3. Pytest config

- Quy ước pytest: thư mục `test*`, file `test_*`. Viết `test_foo: assert 1 == 1`, chạy `pytest . -s -v` xanh.
- PyCharm: Edit Configurations → Python tests → pytest, script path = root, params `. --v` (transcript đọc; ý là `-v`), chạy runner thấy tick xanh — tiện cho các bài test chain sau.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| Tổ chức graph/state/const/nodes/chains | Quy ước của khóa học; docs LangGraph không bắt buộc layout này. | https://docs.langchain.com/langgraph |
| Quy ước pytest `test*` | Quy ước pytest chuẩn. | https://docs.pytest.org/ |

> Ghi nhận: không API framework nên không có nội dung lỗi thời. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế.

## 4. Tóm tắt một trang

| Thành phần | Vai trò |
|---|---|
| graph.py / state.py / const.py | Nối luồng / state / tên nodes |
| nodes/ ↔ chains/ | 1 node chạy 1 chain tương ứng |
| tests/test_chains.py | Sanity check từng chain |
| ingestion.py | Nạp vector store |

**Một câu chốt:** Muốn graph phức tạp mà không rối, hãy để thư mục kể lại kiến trúc — nhìn cây file là đoán được luồng chạy.

## 5. Câu hỏi tự kiểm tra

1. Vì sao mỗi node nên có một chain tương ứng?
2. `const.py` chống được lỗi gì?
3. Vì sao state để riêng file?
4. Quy ước đặt tên nào để pytest nhận test?
5. Lệnh chạy test thủ công trong transcript là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì node chỉ là vỏ orchestration (nhận state, gọi chain, update state); logic LLM nằm ở chain — tách ra dễ test chain độc lập trước khi ráp graph.

**2.** Trùng/tên node sai chính tả rải rác: mọi chỗ reference qua const, đổi tên chỉ sửa một nơi.

**3.** Vì state là hợp đồng chung mọi node đọc/ghi; để riêng tránh circular import và dễ review luồng dữ liệu.

**4.** Thư mục bắt đầu `test`, file prefix `test_` (ở đây `tests/test_chains.py`, hàm `test_foo`).

**5.** `pytest . -s -v` (root, hiện stdout, verbose) — transcript đọc "dash s v".

</details>

## 6. Bước tiếp theo

Bài 116 — *Managing Information Flow: The GraphState* — định nghĩa question/documents/web_search/generation (bài 115 rỗng nên bỏ qua).
