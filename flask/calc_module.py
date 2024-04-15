def calculate_structure(udl, length, section_modulus):
    # 等分布荷重を受ける単純梁の曲げ応力度
    # udl: Uniformly Distributed Load (UDL): 等分布荷重
    # section_modulus: 断面係数

    bending_moment = udl * length**2 / 8
    bending_stress = bending_moment / section_modulus

    return bending_stress


# test
# print(calculate_structure(8, 1, 2))
# print(calculate_structure(10, 20, 50))

