// prisma/seed.ts

import { PrismaClient, Department, Gender, Status } from '@prisma/client';
import { faker } from '@faker-js/faker';

// Khởi tạo Prisma Client
const prisma = new PrismaClient();

async function main() {
  // === 1. Dọn dẹp DB trước mỗi lần seed để tránh trùng lặp ===
  console.log('🧹 Bắt đầu dọn dẹp database...');
  await prisma.userRole.deleteMany();
  await prisma.rolePermission.deleteMany();
  await prisma.user.deleteMany();
  await prisma.member.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.major.deleteMany();
  console.log('✅ Dọn dẹp thành công.');

  // === 2. Tạo dữ liệu cho các bảng không có khóa ngoại ===

  // Tạo Permissions (Quyền)
  console.log('🔑 Tạo các Permissions...');
  const perm_view_dashboard = await prisma.permission.create({
    data: {
      path: '/admin/dashboard',
      category: 'Dashboard',
      description: 'Xem trang tổng quan',
    },
  });
  const perm_manage_members = await prisma.permission.create({
    data: {
      path: '/api/members',
      category: 'Member Management',
      description: 'Quản lý thành viên (CRUD)',
    },
  });
  const perm_assign_roles = await prisma.permission.create({
    data: {
      path: '/api/roles/assign',
      category: 'Role Management',
      description: 'Gán vai trò cho người dùng',
    },
  });
  console.log('✅ Permissions đã được tạo.');

  // Tạo Roles (Vai trò)
  console.log('👑 Tạo các Roles...');
  const role_chunhiem = await prisma.role.create({
    data: {
      name: 'CHỦ NHIỆM',
      description: 'Vai trò cao nhất, có toàn quyền quản lý CLB',
    },
  });
  const role_thanhvien = await prisma.role.create({
    data: {
      name: 'THÀNH VIÊN',
      description: 'Thành viên bình thường của CLB',
    },
  });
  console.log('✅ Roles đã được tạo.');

  // Tạo Majors (Chuyên ngành)
  console.log('📚 Tạo các Majors...');
  const major_cntt = await prisma.major.create({
    data: {
      majorName: 'Công nghệ thông tin',
      majorCode: 'IT',
    },
  });
  const major_qtkd = await prisma.major.create({
    data: {
      majorName: 'Quản trị kinh doanh',
      majorCode: 'BA',
    },
  });
  console.log('✅ Majors đã được tạo.');

  console.log('🔗 Gán Permissions cho Roles...');
  // Chủ nhiệm có tất cả các quyền
  await prisma.rolePermission.createMany({
    data: [
      { roleId: role_chunhiem.id, permissionId: perm_view_dashboard.id },
      { roleId: role_chunhiem.id, permissionId: perm_manage_members.id },
      { roleId: role_chunhiem.id, permissionId: perm_assign_roles.id },
    ],
  });
  // Thành viên chỉ có quyền xem dashboard
  await prisma.rolePermission.create({
    data: {
      roleId: role_thanhvien.id,
      permissionId: perm_view_dashboard.id,
    },
  });
  console.log('✅ Gán quyền thành công.');

  // === 4. Tạo dữ liệu chính (Members và Users) ===

  console.log('👤 Tạo 10 Members và Users giả...');
  for (let i = 0; i < 10; i++) {
    // Tạo Member
const lastName = faker.person.lastName();
const firstName = faker.person.firstName();
const controlledName = `${lastName} ${faker.person.middleName()} ${firstName}`;

// Tạo Member với tên đã được kiểm soát và cắt ngắn để đảm bảo
// Dán vào bên trong vòng lặp for
const member = await prisma.member.create({
  data: {
    name: controlledName.substring(0, 50),
    rollNumber: `QS1800${faker.string.numeric(2)}`,
    department: faker.helpers.arrayElement(Object.values(Department)),
    // Dòng sửa lỗi nằm ở đây
    phone: `09${faker.string.numeric(8)}`,
    dob: faker.date.birthdate({ min: 18, max: 22, mode: 'age' }),
    gender: faker.helpers.arrayElement(Object.values(Gender)),
    email: faker.internet.email({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      provider: 'fpt.edu.vn',
    }),
    status: Status.Active,
    majorId: i % 2 === 0 ? major_cntt.id : major_qtkd.id,
  },
});

    // Với mỗi Member, tạo một User tương ứng
    const user = await prisma.user.create({
      data: {
        googleId: faker.string.alphanumeric(21),
        memberId: member.id, // Liên kết với member vừa tạo
      },
    });

    // Gán Role cho User vừa tạo
    // Thằng đầu tiên làm Chủ nhiệm, còn lại là Thành viên
    await prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: i === 0 ? role_chunhiem.id : role_thanhvien.id,
      },
    });

    console.log(`- Đã tạo Member: ${member.name} | User: ${user.id} | Role: ${i === 0 ? 'CHỦ NHIỆM' : 'THÀNH VIÊN'}`);
  }
  console.log('✅ Tạo Members và Users thành công.');
}

// Chạy hàm main và xử lý kết quả
main()
  .then(async () => {
    console.log('🎉 Seeding thành công!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding thất bại:', e);
    await prisma.$disconnect();
    process.exit(1);
  });